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

const validationSchema = Yup.object().shape({
  participants: Yup.array()
    .min(1, 'Inserisci almeno un partecipante')
    .max(10, 'Massimo 10 partecipanti')
    .of(Yup.string().required('Questo campo è richiesto')),
  message: Yup.string(),
})

const RSVPForm = () => {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const location = useLocation()
  const [formValues, setFormValues] = useState({
    participants: [''],
    message: '',
  })
  const [confirmed, setConfirmed] = useState(() => {
    if (typeof window !== 'undefined') {
      // This code will be executed only in client side
      return localStorage.getItem('CONFIRMED') === 'true'
    }
    return false
  })

  const [showSuccessModal, setShowSuccessModal] = useState(false)

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
      setLoading(true) // Attiva lo stato di caricamento

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
      setError(error.message || "Si è verificato un errore durante l'invio.")
    } finally {
      setLoading(false) // Disattiva lo stato di caricamento indipendentemente dall'esito
    }
  }

  return (
    <Container maxWidth="md" className="mt-8">
      <Typography variant="h4" component="h1" gutterBottom>
        RSVP Form
      </Typography>
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
                        className="ml-2"
                      >
                        Rimuovi
                      </Button>
                    </div>
                  )}
                </div>
              ))}
              {values.participants.length < 10 && (
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
                  disabled={!isValid || loading} // Disabilita il pulsante durante il caricamento
                >
                  {loading ? (
                    <CircularProgress size={24} color="inherit" />
                  ) : (
                    'Invia'
                  )}
                </Button>
                {error && (
                  <div className="text-red-500 text-sm mt-2">
                    Errore durante l'invio del form: {error}
                  </div>
                )}
              </div>
            </Form>
          )}
        </Formik>
      )}

      <Modal open={showSuccessModal} onClose={() => setShowSuccessModal(false)}>
        <Container maxWidth="sm" className="mt-8 p-4 bg-white">
          <Typography variant="h5" gutterBottom>
            Presenza confermata, a presto!
          </Typography>
          <Button
            variant="contained"
            color="primary"
            onClick={() => {
              setShowSuccessModal(false)
            }}
          >
            Chiudi
          </Button>
        </Container>
      </Modal>
    </Container>
  )
}

export default RSVPForm
