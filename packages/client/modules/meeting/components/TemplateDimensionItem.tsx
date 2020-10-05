import styled from '@emotion/styled'
import graphql from 'babel-plugin-relay/macro'
import React, {useState} from 'react'
import {DraggableProvided} from 'react-beautiful-dnd'
import {createFragmentContainer} from 'react-relay'
import useAtmosphere from '~/hooks/useAtmosphere'
import useMutationProps from '~/hooks/useMutationProps'
import {TemplateDimensionItem_dimensions} from '~/__generated__/TemplateDimensionItem_dimensions.graphql'
import Icon from '../../../components/Icon'
//import RemoveReflectTemplateDimensionMutation from '../../../mutations/RemoveReflectTemplateDimensionMutation'
import {PALETTE} from '../../../styles/paletteV2'
import {ICON_SIZE} from '../../../styles/typographyV2'
import {TemplateDimensionItem_dimension} from '../../../__generated__/TemplateDimensionItem_dimension.graphql'
import EditableTemplateDescription from './EditableTemplateDescription'
import EditableTemplateDimension from './EditableTemplateDimension'
//import EditableTemplateDimensionColor from './EditableTemplateDimensionColor'

interface Props {
  isOwner: boolean
  isDragging: boolean
  dimension: TemplateDimensionItem_dimension
  dimensions: TemplateDimensionItem_dimensions
  dragProvided: DraggableProvided
}

interface StyledProps {
  isDragging?: boolean
  isHover?: boolean
}

const DimensionItem = styled('div')<StyledProps & {isOwner: boolean}>(
  ({isOwner, isHover, isDragging}) => ({
    alignItems: 'flex-start',
    backgroundColor:
      isOwner && (isHover || isDragging) ? PALETTE.BACKGROUND_MAIN_LIGHTENED : undefined,
    cursor: isOwner ? 'pointer' : undefined,
    display: 'flex',
    fontSize: 14,
    lineHeight: '24px',
    padding: '4px 16px',
    width: '100%'
  })
)

const RemoveDimensionIcon = styled(Icon)<StyledProps>(({isHover}) => ({
  color: PALETTE.TEXT_GRAY,
  cursor: 'pointer',
  display: 'block',
  fontSize: ICON_SIZE.MD18,
  height: 24,
  lineHeight: '24px',
  marginLeft: 'auto',
  padding: 0,
  opacity: isHover ? 1 : 0,
  textAlign: 'center',
  width: 24
}))

const DimensionAndDescription = styled('div')({
  width: '100%',
  display: 'flex',
  flexDirection: 'column',
  paddingLeft: 16
})

const TemplateDimensionItem = (props: Props) => {
  const {dragProvided, isDragging, isOwner, dimension, dimensions} = props
  const {id: dimensionId, scale} = dimension
  const [isHover, setIsHover] = useState(false)
  const [isEditingDescription, setIsEditingDescription] = useState(false)
  const {submitting, submitMutation, onError, onCompleted} = useMutationProps()
  const atmosphere = useAtmosphere()
  const canRemove = dimensions.length > 1 && isOwner
  const onMouseEnter = () => {
    setIsHover(true)
  }
  const onMouseLeave = () => {
    setIsHover(false)
  }
  const removeDimension = () => {
    if (submitting) return
    if (!canRemove) {
      onError(new Error('You must have at least 1 dimension'))
      return
    }
    submitMutation()
    //RemoveReflectTemplateDimensionMutation(atmosphere, {dimensionId}, {}, onError, onCompleted)
  }

  return (
    <DimensionItem
      ref={dragProvided.innerRef}
      {...dragProvided.dragHandleProps}
      {...dragProvided.draggableProps}
      isDragging={isDragging}
      isHover={isHover}
      isOwner={isOwner}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      {/* <EditableTemplateDimensionColor isOwner={isOwner} dimension={dimension} dimensions={dimensions} /> */}
      <DimensionAndDescription>
        <EditableTemplateDimension
          isOwner={isOwner}
          isEditingDescription={isEditingDescription}
          isHover={isHover}
          scaleName={scale.name}
          dimensionId={dimensionId}
          dimensions={dimensions}
        />
        {/* <EditableTemplateDescription
          isOwner={isOwner}
          description={description}
          onEditingChange={setIsEditingDescription}
          dimensionId={dimensionId}
        /> */}
      </DimensionAndDescription>
      {canRemove && (
        <RemoveDimensionIcon isHover={isHover} onClick={removeDimension}>
          cancel
        </RemoveDimensionIcon>
      )}
    </DimensionItem>
  )
}
export default createFragmentContainer(TemplateDimensionItem, {
  dimensions: graphql`
    fragment TemplateDimensionItem_dimensions on TemplateDimension @relay(plural: true) {
      #...EditableTemplateDimensionColor_dimensions
      ...EditableTemplateDimension_dimensions
    }
  `,
  dimension: graphql`
    fragment TemplateDimensionItem_dimension on TemplateDimension {
      #...EditableTemplateDimensionColor_dimension
      id
      scale {
        name
      }
    }
  `
})
