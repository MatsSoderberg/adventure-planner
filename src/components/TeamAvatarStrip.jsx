import { teamMembers } from '../data/teamEkero'

export default function TeamAvatarStrip({ compact = false }) {
  return (
    <div className={`teamAvatarStrip ${compact ? 'compact' : ''}`} title="Team Ekerö Expedition">
      {teamMembers.map((member) => (
        <img key={member.id} src={member.avatar} alt={member.realName || member.name} />
      ))}
      <span>{teamMembers.length}</span>
    </div>
  )
}
