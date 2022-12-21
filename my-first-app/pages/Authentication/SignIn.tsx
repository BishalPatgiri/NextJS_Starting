import { useSession,signIn,signOut } from 'next-auth/react'
import React from 'react'

export default function SignIn(){
    const {data:session}=useSession()
    if(session){
        return (
            <div>
                <p>Welcome {session.user?.email}</p>
                <button onClick={()=>signOut()}>Sign out</button>
                    
            </div>
  )
    }
    else{
        return (
            <div>
                <p>You are not signed in</p>
                <button onClick={()=>signIn()}>SignIn</button>

            </div>
          )
    }
}
