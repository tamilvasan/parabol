import React, {useEffect, useState} from 'react'
import styled from '@emotion/styled'
import {PRO_LABEL} from '../utils/constants'
import Confetti from './Confetti'
import DialogTitle from './DialogTitle'
import InvitationDialogCopy from './InvitationDialogCopy'
import SecondaryButton from './SecondaryButton'
import DialogContainer from './DialogContainer'

const Illustration = styled('img')({
  display: 'block ',
  maxWidth: 256
})

const ButtonBlock = styled('div')({
  padding: 24
})

const ModalButton = styled(SecondaryButton)({
  padding: 8,
  width: 264
})

const Container = styled(DialogContainer)({
  alignItems: 'center'
})

const StyledDialogTitle = styled(DialogTitle)({
  padding: '0 24px'
})

interface Props {
  closePortal: () => void
}

const UpgradeSuccess = (props: Props) => {
  const [active, setActive] = useState(false)
  useEffect(() => {
    setTimeout(() => {
      setActive(true)
    }, 150)
  }, [])
  const {closePortal} = props
  return (
    <Container>
      <Illustration
        src={`${__STATIC_IMAGES__}/illustrations/conversion_prompt-payment_success.svg`}
      />
      <StyledDialogTitle>{'Upgraded!'}</StyledDialogTitle>
      <InvitationDialogCopy>{'Your organization is'}</InvitationDialogCopy>
      <InvitationDialogCopy>
        {'now on the '}
        <b>{PRO_LABEL}</b>
        {' tier'}
      </InvitationDialogCopy>
      <ButtonBlock>
        <ModalButton size='large' onClick={closePortal}>
          {'Back to Business'}
        </ModalButton>
      </ButtonBlock>
      <Confetti active={active} />
    </Container>
  )
}

export default UpgradeSuccess
