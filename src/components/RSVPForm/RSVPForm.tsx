import React, { Fragment, useEffect, useState } from 'react'
import { ErrorMessage, Form, Formik } from 'formik'
import * as Yup from 'yup'
import {
  Button,
  CircularProgress,
  Container,
  Modal,
  TextField,
  Typography,
} from '@mui/material'
import emailjs from '@emailjs/browser'
import gifImageDance from '../../images/dance.gif'
import gifImageSleep from '../../images/sleep.gif'
import weddingCouple from '../../images/wedding-couple.gif'
import { Participant } from '../../models/Participant'

const validationSchema = Yup.object().shape({
  participants: Yup.array()
    .of(
      Yup.object().shape({
        firstName: Yup.string().required(
          'Il nome del partecipante è obbligatorio',
        ),
        lastName: Yup.string().required(
          'Il cognome del partecipante è obbligatorio',
        ),
      }),
    )
    .min(1, 'Inserisci almeno un partecipante')
    .max(10, 'Massimo 10 partecipanti'),
  message: Yup.string(),
})

const RSVPForm = ({
  participants,
  updateParticipants,
}: {
  participants: Participant[]
  updateParticipants: (newValue: Participant[]) => void
}) => {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [confirmed, setConfirmed] = useState(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('CONFIRMED') === 'true'
    }
    return false
  })
  const [showSuccessModal, setShowSuccessModal] = useState(false)

  useEffect(() => {
    if (confirmed) {
      setShowSuccessModal(true)
    }
  }, [confirmed])

  const handleSubmit = async (values: {
    participants: Participant[]
    message: string
  }) => {
    try {
      setLoading(true)

      await emailjs.send(
        process.env.GATSBY_EMAILJS_SERVICE_ID!,
        process.env.GATSBY_EMAILJS_CONTACT_ME_TEMPLATE_ID!,
        {
          to_email: 'gabelliniriccardo.94@gmail.com',
          participants: values.participants,
          message: values.message,
        },
        process.env.GATSBY_EMAILJS_PUBLIC_KEY!,
      )

      updateParticipants(values.participants)
      setShowSuccessModal(true)
      setConfirmed(true)
      localStorage.setItem('CONFIRMED', 'true')
    } catch (error) {
      console.error("Errore nell'invio dell'email:", error)
      setError(
        "Si è verificato un errore durante l'invio della conferma. Riprovare più tardi.",
      )
    } finally {
      setLoading(false)
    }
  }

  return (
    <Container maxWidth="md" className="my-8">
      <div className="flex justify-between items-end gap-4">
        <Typography
          variant="h4"
          component="h1"
          gutterBottom
          id="confirm-presence-section"
        >
          Conferma Presenza
        </Typography>
        <img
          src={weddingCouple}
          alt="Couple"
          className="w-20 h-20 md:w-40 md:h-40 rounded-full shadow-lg object-cover my-auto"
        />
      </div>
      {confirmed && (
        <div className="flex flex-col items-center justify-center bg-green-100 border border-green-400 text-green-700 px-4 py-2 rounded-md mt-4">
          <Typography variant="body1">
            Presenza già confermata, non è necessario fare nulla ora. Al più si
            può dormire come dei panda{' '}
          </Typography>
          <img src={gifImageSleep} alt="GIF" className="max-w-24" />
        </div>
      )}

      {!confirmed && (
        <Formik
          initialValues={{
            participants: participants,
            message: '',
          }}
          validationSchema={validationSchema}
          enableReinitialize
          onSubmit={handleSubmit}
        >
          {({ values, handleChange, isValid, errors }) => (
            <Fragment>
              <div className="my-8">
                {values.participants.length > 1 ? (
                  <Typography variant="body1">
                    La vostra presenza per noi è fondamentale, per questo vi
                    chiediamo di confermarla di seguito
                  </Typography>
                ) : (
                  <Typography variant="body1">
                    La tua presenza per noi è fondamentale, per questo ti
                    chiediamo di confermarla di seguito
                  </Typography>
                )}

                <Typography variant="body1">
                  Se ci siamo dimenticati qualcuno aggiungilo pure
                </Typography>
              </div>
              <Form>
                {values.participants.map((participant, index) => (
                  <div key={index} className="flex flex-col gap-4">
                    <div className="flex flex-col md:flex-row gap-4">
                      <TextField
                        error={Boolean(
                          errors.participants &&
                            errors.participants[index] &&
                            errors.participants[index].firstName,
                        )}
                        id={`outlined-firstName-${index}`}
                        name={`participants.${index}.firstName`}
                        label="Nome"
                        placeholder="Inserisci nome partecipante"
                        value={participant.firstName}
                        onChange={handleChange}
                        fullWidth
                        variant="outlined"
                        helperText={
                          errors.participants &&
                          errors.participants[index] &&
                          (errors.participants[index].firstName || '')
                        }
                      />
                      <TextField
                        error={Boolean(
                          errors.participants &&
                            errors.participants[index] &&
                            errors.participants[index].lastName,
                        )}
                        id={`outlined-lastName-${index}`}
                        name={`participants.${index}.lastName`}
                        label="Cognome"
                        placeholder="Inserisci cognome partecipante"
                        value={participant.lastName}
                        onChange={handleChange}
                        fullWidth
                        variant="outlined"
                        helperText={
                          errors.participants &&
                          errors.participants[index] &&
                          (errors.participants[index].lastName || '')
                        }
                      />
                    </div>
                    {values.participants.length > 1 && (
                      <div className="flex items-center my-3">
                        <Button
                          type="button"
                          onClick={() => {
                            const updatedParticipants = [...values.participants]
                            updatedParticipants.splice(index, 1)
                            updateParticipants(updatedParticipants)
                            handleChange({
                              target: {
                                name: 'participants',
                                value: updatedParticipants,
                              },
                            })
                          }}
                          variant="outlined"
                          color="error"
                        >
                          Rimuovi
                        </Button>
                      </div>
                    )}
                  </div>
                ))}

                {values.participants.length < 10 && (
                  <div className="flex items-center my-2">
                    <Button
                      type="button"
                      onClick={() => {
                        handleChange({
                          target: {
                            name: 'participants',
                            value: [
                              ...values.participants,
                              { firstName: '', lastName: '' },
                            ],
                          },
                        })
                        updateParticipants([
                          ...values.participants,
                          { firstName: '', lastName: '' },
                        ])
                      }}
                      variant="outlined"
                      color="success"
                      className="mt-2"
                    >
                      Aggiungi Partecipante
                    </Button>
                  </div>
                )}

                <TextField
                  error={Boolean(errors.message)}
                  id="outlined-message"
                  label="Messaggio"
                  placeholder="Inserisci il messaggio"
                  value={values.message}
                  onChange={handleChange}
                  fullWidth
                  variant="outlined"
                />
                <ErrorMessage
                  name="message"
                  component="div"
                  className="text-red-500 text-sm"
                />

                <div className="flex justify-center mt-4">
                  <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    disabled={!isValid || loading}
                  >
                    {loading ? (
                      <CircularProgress size={24} color="inherit" />
                    ) : (
                      'Invia'
                    )}
                  </Button>
                </div>
              </Form>
            </Fragment>
          )}
        </Formik>
      )}

      <Modal
        open={showSuccessModal || !!error}
        onClose={() => setShowSuccessModal(false)}
      >
        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center">
          <div
            className={`bg-white p-4 rounded-lg ${error ? 'bg-red-100' : ''}`}
          >
            {error ? (
              <div>
                <Typography variant="h5" gutterBottom className="text-red-500">
                  Errore durante l'invio:
                </Typography>
                <Typography variant="body1" gutterBottom>
                  {error}
                </Typography>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center">
                <Typography variant="h5" gutterBottom>
                  Presenza confermata, a presto!
                </Typography>
                <Typography
                  variant="body1"
                  gutterBottom
                  className="text-center"
                >
                  Grazie per aver confermato la tua presenza.
                </Typography>
                <img
                  src={gifImageDance}
                  alt="GIF"
                  className="max-w-24 mx-auto mt-4"
                />
              </div>
            )}
            <div className="flex justify-center mt-4">
              <Button
                variant="contained"
                color="primary"
                onClick={() => {
                  setShowSuccessModal(false)
                  setError(null)
                }}
              >
                Chiudi
              </Button>
            </div>
          </div>
        </div>
      </Modal>
    </Container>
  )
}

export default RSVPForm
