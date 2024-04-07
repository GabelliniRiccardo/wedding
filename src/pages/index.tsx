import * as React from 'react'
import { useEffect, useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import type { HeadFC, PageProps } from 'gatsby'
import Layout from '../components/Layout/Layout'
import batmanDance from '../images/batman-dance.gif'
import WhenAndWhere from '../components/WhenAndWhere/WhenAndWhere'
import HowToGiveUsAPresent from '../components/HowToGiveUsAPresent/HowToGiveUsAPresent'
import RSVPForm from '../components/RSVPForm/RSVPForm'
import queryString from 'query-string'
import { useLocation } from '@reach/router'
import { Participant } from '../models/Participant'
import { StaticImage } from 'gatsby-plugin-image'

const IndexPage: React.FC<PageProps> = () => {
  const whenAndWhereRef = useRef(null)
  const isWhenAndWhereInView = useInView(whenAndWhereRef, {
    margin: '0px 0px -60% 0px',
    once: true,
  })
  const howToGiveUsAPresentRef = useRef(null)
  const isHowToGiveUsAPresentView = useInView(howToGiveUsAPresentRef, {
    margin: '0px 0px -60% 0px',
    once: true,
  })

  const location = useLocation()
  const [participants, setParticipants] = useState<Participant[]>([])

  useEffect(() => {
    const queryParams = queryString.parse(location.search)
    let participantsFromQuery = queryParams.participants || ''

    if (Array.isArray(participantsFromQuery)) {
      participantsFromQuery = participantsFromQuery.join(',')
    }

    const participantsArray = participantsFromQuery.split(',')
    const participants = participantsArray.length > 0 ? participantsArray : ['']

    const participantsData = participants.map((participant) => {
      const [firstName, ...lastName] = participant.split(' ')
      const lastNameValue = lastName.join(' ')
      return { firstName, lastName: lastNameValue }
    })

    setParticipants(participantsData)
  }, [location.search])

  return (
    <Layout showNavbar={true}>
      <motion.section
        className="h-screen relative"
        style={{
          position: 'relative', // Assicurati di impostare la posizione a relativa per far sì che l'immagine di sfondo sia allineata correttamente
        }}
      >
        <StaticImage
          src="../images/couple.jpg"
          alt="Couple"
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
          }}
        />

        <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="text-center text-white">
            <h1 className="text-5xl md:text-8xl font-bold mb-4 text-wrap">
              <span className="block md:inline">Riccardo </span>
              <span className="block md:inline">& </span>
              <span className="block md:inline">Chiara </span>
            </h1>
            <h2 className="text-2xl md:text-3xl font-medium">
              7 Settembre 2024
            </h2>
          </div>
        </div>
      </motion.section>

      <div className="container mx-auto mt-8 px-1">
        <div className="grid grid-cols-1 lg:grid-cols-2 justify-items-center gap-20">
          <motion.div
            className="w-full"
            ref={whenAndWhereRef}
            initial={{ opacity: 0, x: -100 }}
            animate={{
              opacity: isWhenAndWhereInView ? 1 : 0,
              x: isWhenAndWhereInView ? 0 : -100,
            }}
            transition={{ duration: 2.5 }}
          >
            <WhenAndWhere />
          </motion.div>

          <div className="flex flex-col justify-items-center rounded-lg shadow-lg my-auto">
            <StaticImage
              src="../images/couple.jpg"
              alt="First Wedding Image"
              className="rounded-t-md"
            />
            <div className="p-4">07/04/2013 l'inizio....</div>
          </div>

          <StaticImage
            src="../images/couple.jpg"
            alt="Couple"
            className="w-full md:w-96 md:h-96 rounded-full shadow-lg object-cover my-auto"
          />

          <motion.div
            className="w-full"
            ref={howToGiveUsAPresentRef}
            initial={{ opacity: 0, x: 100 }}
            animate={{
              opacity: isHowToGiveUsAPresentView ? 1 : 0,
              x: isHowToGiveUsAPresentView ? 0 : 100,
            }}
            transition={{ duration: 2.5 }}
          >
            <HowToGiveUsAPresent
              isSingleParticipant={participants.length === 1}
            />
          </motion.div>
        </div>

        <RSVPForm
          updateParticipants={(newValue: Participant[]) => {
            setParticipants(newValue)
          }}
          participants={participants}
        />

        {participants.length > 1 ? (
          <div className="text-center">
            <p>
              Il nostro "Ingegnere" di fiducia ha realizzato questa pagina per
              formalizzare il vostro invito al nostro matrimonio!
            </p>
            <p>
              {' '}
              Se notate dei problemi alla pagina.. Beh, sappiate che lo paghiamo
              poco e lo facciamo lavorare di notte 🦇
            </p>
          </div>
        ) : (
          <div className="text-center">
            <p>
              Il nostro "Ingegnere" di fiducia ha realizzato questa pagina per
              formalizzare il tuo invito al nostro matrimonio!
            </p>
            <p>
              {' '}
              Se noti dei problemi alla pagina... Beh, sappi che lo paghiamo
              poco e lo facciamo lavorare di notte 🦇
            </p>
          </div>
        )}
      </div>
      <img src={batmanDance} alt="BatmanDance" className="w-20 h-20 mx-auto" />
    </Layout>
  )
}

export default IndexPage

export const Head: HeadFC = () => <title>Wedding Riccardo & Chiara</title>
