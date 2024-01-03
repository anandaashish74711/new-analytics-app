import React from 'react'
import Profile from './Profile'
import BioGraph from './BioGraph'
import PhaseGraph from './PhaseGraph'
import ComorbiditiesCard from './combodities'
export default function Body() {
  return (
    <div>
<Profile/>
<BioGraph/>
<PhaseGraph/>
<ComorbiditiesCard/>
    </div>
  )
}
