'use client'

import { Fade } from 'react-awesome-reveal'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Factory, Building2, Database, Zap, Truck, Hospital, Plane, Ship } from 'lucide-react'
import { Button } from '../ui/button'

const industries = [
  {
    name: 'Manufacturing',
    icon: Factory,
    description: 'Powering production lines and industrial processes with reliable switchgear solutions.',
    applications: ['Process Control', 'Motor Control Centers', 'Power Distribution'],
  },
  {
    name: 'Commercial Buildings',
    icon: Building2,
    description: 'Ensuring uninterrupted power supply for offices, malls, and other commercial spaces.',
    applications: ['Lighting Control', 'HVAC Systems', 'Emergency Power'],
  },
  {
    name: 'Data Centers',
    icon: Database,
    description: 'Providing critical power infrastructure for data storage and processing facilities.',
    applications: ['UPS Systems', 'Server Power Distribution', 'Cooling Systems'],
  },
  {
    name: 'Utilities',
    icon: Zap,
    description: 'Supporting power generation, transmission, and distribution networks.',
    applications: ['Substations', 'Grid Control', 'Renewable Energy Integration'],
  },
  {
    name: 'Transportation',
    icon: Truck,
    description: 'Powering railways, airports, and electric vehicle charging infrastructure.',
    applications: ['Railway Electrification', 'Airport Systems', 'EV Charging Stations'],
  },
  {
    name: 'Healthcare',
    icon: Hospital,
    description: 'Ensuring reliable power for critical medical equipment and facilities.',
    applications: ['Emergency Power Systems', 'Medical Equipment Power', 'HVAC Control'],
  },
  {
    name: 'Aerospace',
    icon: Plane,
    description: 'Providing specialized switchgear solutions for aerospace applications.',
    applications: ['Ground Support Equipment', 'Hangar Power Systems', 'Avionics Testing'],
  },
  {
    name: 'Marine',
    icon: Ship,
    description: 'Delivering robust switchgear for ships and offshore platforms.',
    applications: ['Ship Power Systems', 'Offshore Platforms', 'Port Facilities'],
  }
]

export default function IndustriesServed() {
  return (
    <div className="container mx-auto px-4 md:px-8 lg:px-12 pb-12">
      <Fade duration={500} distance="20px" triggerOnce>
        <h2 className="text-3xl font-bold mb-4 text-center">Industries We Serve</h2>
      </Fade>
      <Fade duration={500} distance="20px" triggerOnce delay={200}>
        <p className="max-w-3xl mx-auto text-muted-foreground text-center mb-12">
          Our switchgear solutions power a wide range of sectors, ensuring reliable and efficient operations across diverse industries.
        </p>
      </Fade>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {industries.map((industry, index) => (
          <Fade key={industry.name} duration={500} distance="20px" triggerOnce delay={index * 100}>
            <Card
              className="h-full flex flex-col transform transition-all duration-300 ease-in-out hover:shadow-lg hover:bg-gray-50"
            >
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <industry.icon className="h-6 w-6" />
                  {industry.name}
                </CardTitle>
              </CardHeader>
              <CardContent className="flex-grow">
                <CardDescription className="mb-4">{industry.description}</CardDescription>
                <div className="flex flex-wrap gap-2">
                  {industry.applications.map((app, appIndex) => (
                    <Badge key={appIndex} variant="secondary" className='bg-gray-100 hover:bg-main hover:text-white'>
                      {app}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          </Fade>
        ))}
      </div>

      <div className="mt-8 text-center hidden sm:block">
        <Fade duration={500} triggerOnce delay={industries.length * 100}>
          <Button className="inline-block bg-main text-white hover:bg-black transition">
            Contact Us for Industry-Specific Solutions
          </Button>
        </Fade>
      </div>
    </div>
  )
}
