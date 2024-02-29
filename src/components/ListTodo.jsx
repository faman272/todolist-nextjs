import { PencilSimple, Backspace, PushPin } from "@phosphor-icons/react";

const ListTodo = ({ text, completed, priority, time, handleDelete, handleCheckboxChange, handleEdit, handlePriority }) => {

    return (
        <ul className="mt-3 flex flex-col gap-3">
            <li>

                <div className="form-control w-full border border-accent rounded-lg p-0.5">
                    <label className="cursor-pointer label">
                        <input
                            type="checkbox"
                            checked={completed}
                            onChange={handleCheckboxChange}
                            className="checkbox checkbox-accent"
                        />
                        <span className={`flex gap-3    ${priority ? 'text-accent' : ''}  w-full px-4 label-text font-bold text-[16px] tracking-wide  ${completed ? 'line-through' : ''}`}>
                            {text}

                            {
                                time ?
                                    <div className={`badge badge-accent ${priority ? 'opacity-100' : 'opacity-60'} badge-outline text-[12px]`}>
                                        {time}
                                    </div> :
                                null
                            }


                        </span>
                        <div className="flex join-item">

                            <div className="tooltip" data-tip="Priority">
                                <button onClick={handlePriority} className="btn btn-sm btn-ghost text-accent join-item">
                                    {
                                        priority ? <PushPin weight="fill" size={18} /> : <PushPin size={18} />
                                    }
                                </button>
                            </div>

                            <div className="tooltip" data-tip="Edit">

                                <button onClick={handleEdit} className="btn btn-sm btn-ghost text-accent  join-item"><PencilSimple size={18} /></button>
                            </div>

                            <div className="tooltip" data-tip="Delete">
                                <button onClick={handleDelete} className="btn btn-sm btn-ghost text-accent join-item"><Backspace size={18} /></button>
                            </div>
                        </div>
                    </label>
                </div>
            </li>
        </ul>

    );
};

export default ListTodo;
