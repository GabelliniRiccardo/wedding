import React, { useEffect, useState } from 'react'
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
import queryString from 'query-string'
import { useLocation } from '@reach/router'
import emailjs from '@emailjs/browser'
import gifImageDance from '../../images/dance.gif'
import gifImageSleep from '../../images/sleep.gif'

const validationSchema = Yup.object().shape({
  participants: Yup.array()
    .min(1, 'Inserisci almeno un partecipante')
    .max(10, 'Massimo 10 partecipanti')
    .of(Yup.string().required('Questo campo è richiesto')),
  message: Yup.string(),
})

const RSVPForm = () => {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const location = useLocation()
  const [formValues, setFormValues] = useState({
    participants: [''],
    message: '',
  })
  const [confirmed, setConfirmed] = useState(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('CONFIRMED') === 'true'
    }
    return false
  })

  const [showSuccessModal, setShowSuccessModal] = useState(true)

  useEffect(() => {
    const queryParams = queryString.parse(location.search)
    let participantsFromQuery = queryParams.participants || ''
    if (Array.isArray(participantsFromQuery)) {
      participantsFromQuery = participantsFromQuery.join(',')
    }
    const participantsArray = participantsFromQuery.split(',')
    const participants = participantsArray.length > 0 ? participantsArray : ['']
    setFormValues({
      ...formValues,
      participants: participants,
    })
  }, [location.search])

  const handleSubmit = async (values, { resetForm }) => {
    try {
      setLoading(true)

      await emailjs.send(
        process.env.GATSBY_EMAILJS_SERVICE_ID!,
        process.env.GATSBY_EMAILJS_CONTACT_ME_TEMPLATE_ID!,
        {
          to_email: 'gabelliniriccardo.94@gmail.com',
          participants: values.participants.join(', '),
          message: values.message,
        },
        process.env.GATSBY_EMAILJS_PUBLIC_KEY!,
      )

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
      <Typography
        variant="h4"
        component="h1"
        gutterBottom
        id="confirm-presence-section"
      >
        Conferma Presenza
      </Typography>
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
          initialValues={formValues}
          validationSchema={validationSchema}
          enableReinitialize
          onSubmit={handleSubmit}
        >
          {({ values, handleChange, isValid }) => (
            <Form>
              {values.participants.map((participant, index) => (
                <div key={index} className="mt-4">
                  <TextField
                    type="text"
                    name={`participants.${index}`}
                    label="Partecipante"
                    placeholder="Inserisci nome partecipante"
                    value={participant}
                    onChange={handleChange}
                    fullWidth
                  />
                  <ErrorMessage
                    name={`participants.${index}`}
                    component="div"
                    className="text-red-500 text-sm"
                  />
                  {values.participants.length > 1 && (
                    <div className="flex items-center mt-2">
                      <Button
                        type="button"
                        onClick={() => {
                          const updatedParticipants = [...values.participants]
                          updatedParticipants.splice(index, 1)
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
                <div className="flex items-center mt-2">
                  <Button
                    type="button"
                    onClick={() =>
                      handleChange({
                        target: {
                          name: 'participants',
                          value: [...values.participants, ''],
                        },
                      })
                    }
                    variant="outlined"
                    color="success"
                    className="mt-2"
                  >
                    Aggiungi Partecipante
                  </Button>
                </div>
              )}

              <TextField
                type="text"
                name="message"
                label="Messaggio"
                placeholder="Inserisci il messaggio"
                value={values.message}
                onChange={handleChange}
                fullWidth
                className="mt-4"
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
                  className="max-w-24 mx-auto mt-4" // Aggiungiamo spazio in alto con mt-4
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
