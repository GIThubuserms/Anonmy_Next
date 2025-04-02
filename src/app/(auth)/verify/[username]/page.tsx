import React from 'react'

function Page({params}:{params:{username:string}}) {
  return (
    <div>
      {params.username}
      
    </div>
  )
}

export default Page
