import React, {ReactNode} from 'react'
import styled from '@emotion/styled'
import {PALETTE} from '../styles/paletteV2'
import {NavSidebar} from '../types/constEnums'
import {phaseIconLookup, phaseLabelLookup} from '../utils/meetings/lookups'
import Icon from './Icon'
import Badge from './Badge/Badge'

const NavListItem = styled('li')({
  fontWeight: 600,
  display: 'flex',
  flexDirection: 'column',
  margin: '0 8px 0 0',
  // hack to work around broken flexbox
  // https://bugs.chromium.org/p/chromium/issues/detail?id=927066
  minHeight: 40
})

const NavItemIcon = styled(Icon)<{isUnsyncedFacilitatorPhase: boolean}>(
  {
    color: PALETTE.TEXT_GRAY,
    margin: '0 16px'
  },
  ({isUnsyncedFacilitatorPhase}) => ({
    color: isUnsyncedFacilitatorPhase ? PALETTE.EMPHASIS_WARM : undefined
  })
)

const NavItemLabel = styled('span')({
  display: 'inline-block',
  fontSize: NavSidebar.FONT_SIZE,
  verticalAlign: 'middle'
})

const navListItemLinkActive = {
  backgroundColor: PALETTE.BACKGROUND_NAV_LIGHT_ACTIVE,
  borderLeftColor: PALETTE.BORDER_MAIN,
  borderRadius: '0 4px 4px 0',
  color: PALETTE.TEXT_MAIN,
  ':hover,:focus': {
    backgroundColor: PALETTE.BACKGROUND_NAV_LIGHT_ACTIVE
  }
}

const navListItemLinkDisabled = {
  cursor: 'not-allowed',
  ':hover,:focus': {
    backgroundColor: 'transparent'
  }
}

interface LinkProps {
  isDisabled: boolean
  isActive: boolean
}

const NavListItemLink = styled('div')<LinkProps>(
  {
    alignItems: 'center',
    borderRadius: '0 4px 4px 0',
    color: PALETTE.TEXT_MAIN,
    cursor: 'pointer',
    display: 'flex',
    flexShrink: 0,
    minHeight: 40,
    textDecoration: 'none',
    userSelect: 'none',
    ':hover,:focus': {
      backgroundColor: PALETTE.BACKGROUND_NAV_LIGHT_HOVER
    }
  },
  ({isDisabled}) => isDisabled && navListItemLinkDisabled,
  ({isActive}) => isActive && navListItemLinkActive
)

const PhaseCountBlock = styled('div')({
  alignItems: 'center',
  display: 'flex',
  marginLeft: 'auto'
})

const StyledBadge = styled(Badge)({
  backgroundColor: PALETTE.BACKGROUND_GRAY,
  boxShadow: 'none',
  marginRight: 8,
  minWidth: 24,
  textShadow: 'none'
})

interface Props {
  children: ReactNode
  handleClick?: () => void
  isActive: boolean
  isUnsyncedFacilitatorPhase: boolean
  phaseCount: number | null | undefined
  phaseType: string
}

const NewMeetingSidebarPhaseListItem = (props: Props) => {
  const {children, handleClick, isActive, isUnsyncedFacilitatorPhase, phaseType, phaseCount} = props
  const label = phaseLabelLookup[phaseType]
  const icon = phaseIconLookup[phaseType]
  const showPhaseCount = Boolean(phaseCount || phaseCount === 0)
  return (
    <NavListItem>
      <NavListItemLink
        isDisabled={!handleClick}
        isActive={isActive}
        onClick={handleClick}
        title={label}
      >
        <NavItemIcon isUnsyncedFacilitatorPhase={isUnsyncedFacilitatorPhase}>{icon}</NavItemIcon>
        <NavItemLabel>{label}</NavItemLabel>
        {showPhaseCount && (
          <PhaseCountBlock>
            <StyledBadge>{phaseCount}</StyledBadge>
          </PhaseCountBlock>
        )}
      </NavListItemLink>
      {children}
    </NavListItem>
  )
}

export default NewMeetingSidebarPhaseListItem
