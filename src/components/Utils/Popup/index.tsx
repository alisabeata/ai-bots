import React from 'react'
import ReactDOM from 'react-dom'

interface PopupProps {
  onShare: () => void
  onDelete: () => void
  onRename: () => void
}

const portalRoot: HTMLElement = document.getElementById('portal-root')!

const PopupOverlay: React.FC<PopupProps> = ({
  onShare,
  onDelete,
  onRename,
}) => (
  <div className="popup-container">
    <div className="popup">
      <button data-testid="share-button" onClick={onShare}>
        Share
      </button>
      <button data-testid="delete-button" onClick={onDelete}>
        Delete
      </button>
      <button data-testid="rename-button" onClick={onRename}>
        Rename
      </button>
    </div>
  </div>
)

export const Popup: React.FC<PopupProps> = ({
  onShare,
  onDelete,
  onRename,
}) => {
  return ReactDOM.createPortal(
    <PopupOverlay onShare={onShare} onDelete={onDelete} onRename={onRename} />,
    portalRoot,
  )
}
