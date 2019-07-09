import React from 'react'
import styled from 'react-emotion'
import Toggle from 'universal/components/Toggle/Toggle'
import {createFragmentContainer, graphql} from 'react-relay'
import {SlackNotificationRow_viewer} from '__generated__/SlackNotificationRow_viewer.graphql'
import useAtmosphere from 'universal/hooks/useAtmosphere'
import useMutationProps from 'universal/hooks/useMutationProps'
import SetSlackNotificationMutation from 'universal/mutations/SetSlackNotificationMutation'
import StyledError from 'universal/components/StyledError'
import {SlackNotificationEventEnum} from 'universal/types/graphql'

interface Props {
  event: SlackNotificationEventEnum
  localChannelId: string | null
  viewer: SlackNotificationRow_viewer
  teamId: string
}

const labelLookup = {
  [SlackNotificationEventEnum.meetingEnd]: 'Meeting End',
  [SlackNotificationEventEnum.meetingStart]: 'Meeting Start',
  [SlackNotificationEventEnum.MEETING_STAGE_TIME_LIMIT_END]: 'Meeting Time Limit Ended',
  [SlackNotificationEventEnum.MEETING_STAGE_TIME_LIMIT_START]: 'Meeting Time Limit Started'
}

const Row = styled('div')({
  alignItems: 'center',
  display: 'flex',
  padding: '8px 0'
})

const Label = styled('span')({
  fontSize: 14,
  marginRight: 16,
  width: '100%'
})

const SlackNotificationRow = (props: Props) => {
  const {event, localChannelId, teamId, viewer} = props
  const {teamMember} = viewer
  const {slackNotifications} = teamMember!
  const label = labelLookup[event]
  const atmosphere = useAtmosphere()
  const existingNotification = slackNotifications.find(
    (notification) => notification.event === event
  )
  const active = !!(existingNotification && existingNotification.channelId)
  const {error, submitMutation, onCompleted, onError, submitting} = useMutationProps()
  const onClick = () => {
    if (submitting) return
    submitMutation()
    const slackChannelId = active ? null : localChannelId
    SetSlackNotificationMutation(
      atmosphere,
      {slackChannelId, slackNotificationEvents: [event as any], teamId},
      {
        onError,
        onCompleted
      }
    )
  }

  // does not show disabled when submitting because the temporary disabled mouse icon is ugly
  return (
    <>
      <Row>
        <Label>{label}</Label>
        <Toggle active={active} disabled={!localChannelId} onClick={onClick} />
      </Row>
      {error && <StyledError>{error}</StyledError>}
    </>
  )
}

export default createFragmentContainer(
  SlackNotificationRow,
  graphql`
    fragment SlackNotificationRow_viewer on User {
      teamMember(teamId: $teamId) {
        slackNotifications {
          channelId
          event
        }
      }
    }
  `
)