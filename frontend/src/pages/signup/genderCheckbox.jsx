import React from 'react'

const GenderCheckbox = () => {
  return (
    <div className='flex mt-2'>
        <div className='form-control'>
            <label htmlFor="" className='label gap-2 cursor-pointer'>
                <input type="checkbox" className='checkbox border-slate-900' />
                <span className='label-text'>Male</span>
            </label>
        </div>

        <div className='form-control mx-4'>
            <label htmlFor="" className='label gap-2 cursor-pointer'>
                <input type="checkbox" className='checkbox border-slate-900' />
                <span className='label-text'>Female</span>
            </label>
        </div>
    </div>
  )
}

export default GenderCheckbox