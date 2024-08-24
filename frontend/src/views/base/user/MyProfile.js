import React from 'react'
import useFetchData from './customFetchData'
import MyProfileForm from './MyProfileForm'
const MyProfile = () => {

  const {data, loading} = useFetchData('/user')
  
  return (
      <div>
        {loading && <div>loading</div>}
        {!loading && (
          <MyProfileForm initialValue={data} />   
        )}
      </div>
  )
}

export default MyProfile
