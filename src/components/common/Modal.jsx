import React from 'react'


export default function Modal({open, onClose, children}){
if(!open) return null
return (
<div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
<div className="bg-white p-6 rounded-lg w-full max-w-lg">
<div className="mb-4 text-right">
<button onClick={onClose} className="text-gray-600">Close</button>
</div>
{children}
</div>
</div>
)
}