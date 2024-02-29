export const ModalTime = ({ id, value, onChange, onClick,  }) => {
    return (
        <dialog id={id} className="modal">
            <div class="modal-box">
                {/* Time Picker */}
                <input value={value} type="time" onChange={onChange} class="input input-bordered w-full" />

                <div className="modal-action">
                    <form method="dialog">
                        <button onClick={onClick} className="btn btn-accent btn-sm">Set Time</button>
                    </form>
                </div>

            </div>
            <form method="dialog" class="modal-backdrop">
                <button>Close</button>
            </form>
        </dialog>
    )
}
