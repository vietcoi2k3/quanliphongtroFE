import React from 'react'
import { useParams } from 'react-router-dom';

const ListMotel = () => {
  const { id } = useParams();
  console.log(id)
  return (
    <div>
        ListMotel
    </div>
  )
}

export default ListMotel