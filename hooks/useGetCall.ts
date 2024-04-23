import { useEffect, useState } from 'react'
import { Call, useStreamVideoClient } from '@stream-io/video-react-sdk'
import { useUser } from '@clerk/nextjs'

export const useGetCalls = ()=>{
      const [calls, setCalls] = useState<Call[]>([])
      const client = useStreamVideoClient()
      const [isLoading, setLoading] = useState(false)
      const {user}= useUser()


      useEffect(()=>{
const loadCalls = async ()=>{
      if (!client || !user?.id) return 
      setLoading(true)

      try {
            const {calls} = await client.queryCalls({
                  sort: [{
                        field: 'starts_at', direction: -1
                  }],
                  filter_conditions: {
                        starts_at: {$exists: true},
                        $or:[
                              {
created_by_user_id: user.id
                              },
                              {members: { $in: [user?.id] }},
                        ]
                  }
            });

            setCalls(calls)
      } catch (error) {
            console.log(error)

      } finally{
            setLoading(false)
      }
}
      }, [])
}