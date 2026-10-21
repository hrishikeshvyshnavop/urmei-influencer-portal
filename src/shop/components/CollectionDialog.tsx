import { useState } from 'react'
import FormModal from '../../portal/components/FormModal'
import TextField from '../../portal/components/TextField'
import { COLLECTION_DESCRIPTION_MAX, COLLECTION_NAME_MAX } from '../collections-store'

type CollectionDialogProps = {
  /** "create" is New collection (Figma `1862:88139`); "edit" is Edit
   *  collection (`1862:87829`), opened with the board's current values. */
  mode: 'create' | 'edit'
  initialName?: string
  initialDescription?: string
  /** Names already taken by the creator's other collections; names are
   *  unique (Figma annotation on `1862:85719`). */
  takenNames: string[]
  onSubmit: (name: string, description: string) => void
  onClose: () => void
}

/**
 * The collection details dialog: a 525px panel with the required name and an
 * optional description, each with its "used/max" count, over Cancel and
 * Create Collection / Save Changes. Name errors follow flow 06 (Figma
 * `1862:85718`): empty on submit, over 40 characters while typing, or a name
 * already in use.
 */
export function CollectionDialog({
  mode,
  initialName = '',
  initialDescription = '',
  takenNames,
  onSubmit,
  onClose,
}: CollectionDialogProps) {
  const [name, setName] = useState(initialName)
  const [description, setDescription] = useState(initialDescription)
  const [attempted, setAttempted] = useState(false)

  const trimmed = name.trim()
  const duplicate = takenNames.some((taken) => taken.trim().toLowerCase() === trimmed.toLowerCase())
  const nameError =
    name.length > COLLECTION_NAME_MAX
      ? `${name.length}/${COLLECTION_NAME_MAX} · Use ${COLLECTION_NAME_MAX} characters or fewer`
      : trimmed && duplicate
        ? `You already have a collection called "${trimmed}"`
        : attempted && !trimmed
          ? 'Enter a collection name'
          : undefined

  return (
    <FormModal
      title={mode === 'create' ? 'New collection' : 'Edit collection'}
      submitLabel={mode === 'create' ? 'Create Collection' : 'Save Changes'}
      width={525}
      boldTitle
      onSubmit={() => {
        setAttempted(true)
        if (trimmed && !duplicate && name.length <= COLLECTION_NAME_MAX) onSubmit(name, description)
      }}
      onClose={onClose}
    >
      <TextField
        label="Collection name"
        placeholder="e.g. My morning routine"
        value={name}
        onChange={setName}
        countMax={COLLECTION_NAME_MAX}
        required
        showCount
        error={nameError}
      />
      <TextField
        label="Description (optional)"
        placeholder="One line about this collection"
        value={description}
        onChange={setDescription}
        maxLength={COLLECTION_DESCRIPTION_MAX}
        showCount
      />
    </FormModal>
  )
}
