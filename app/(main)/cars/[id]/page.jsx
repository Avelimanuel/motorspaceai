import React from 'react'

const CarPage = async ({params}) => {
    const {id} = await params
  return (
    <div>CarPage for {id}</div>
  )
}

export default CarPage