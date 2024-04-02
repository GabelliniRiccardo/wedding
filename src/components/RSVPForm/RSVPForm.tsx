import React, { useEffect, useState } from 'react'
import { ErrorMessage, Form, Formik } from 'formik'
import * as Yup from 'yup'
import { Button, Container, Modal, TextField, Typography } from '@mui/material'
import queryString from 'query-string'
import { useLocation } from '@reach/router'

const validationSchema = Yup.object().shape({
  participants: Yup.array()
    .min(1, 'Inserisci almeno un partecipante')
    .max(10, 'Massimo 10 partecipanti')
    .of(Yup.string().required('Questo campo è richiesto')),
  message: Yup.string(),
})

const RSVPForm = () => {
  const location = useLocation()
  const [formValues, setFormValues] = useState({
    participants: [''],
    message: '',
  })
  const [confirmed, setConfirmed] = useState(
    localStorage.getItem('CONFIRMED') === 'true',
  )
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

  const handleSubmit = (values, { resetForm }) => {
    setShowSuccessModal(true)
    setConfirmed(true)
    localStorage.setItem('CONFIRMED', 'true')
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
          {({ values, handleChange }) => (
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
                <Button type="submit" variant="contained" color="primary">
                  Invia
                </Button>
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
