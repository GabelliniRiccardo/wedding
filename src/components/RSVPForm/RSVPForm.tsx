import React, { useEffect } from 'react'
import { ErrorMessage, Form, Formik } from 'formik'
import * as Yup from 'yup'
import { Button, Container, TextField, Typography } from '@mui/material'
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
  const [formValues, setFormValues] = React.useState({
    participants: [''],
    message: '',
  })

  useEffect(() => {
    const queryParams = queryString.parse(location.search)
    let participantsFromQuery = queryParams.participants || ''
    if (Array.isArray(participantsFromQuery)) {
      participantsFromQuery = participantsFromQuery.join(',')
    }
    const participantsArray = participantsFromQuery.split(',')
    const participants = participantsArray.length > 0 ? participantsArray : ['']
    setFormValues({
      ...formValues, // Mantieni gli altri valori del form
      participants: participants,
    })
  }, [location.search])

  return (
    <Container maxWidth="md" className="mt-8">
      <Typography variant="h4" component="h1" gutterBottom>
        RSVP Form
      </Typography>
      <Formik
        initialValues={formValues}
        validationSchema={validationSchema}
        enableReinitialize
        onSubmit={(values, { resetForm }) => {
          // Handle form submission here
          console.log(values)
          resetForm()
        }}
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

            {/* Aggiungi il campo "messaggio" */}
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

            {/* Posiziona il bottone "Invia" al centro su una nuova riga */}
            <div className="flex justify-center mt-4">
              <Button type="submit" variant="contained" color="primary">
                Invia
              </Button>
            </div>
          </Form>
        )}
      </Formik>
    </Container>
  )
}

export default RSVPForm
