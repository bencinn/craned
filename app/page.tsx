import Image from 'next/image'
import Post from '@/stories/Post'
"use client";
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { useState, useEffect } from 'react';

import type { Database } from '@/supabase.types'
import { useRouter } from 'next/navigation'
import { storageClient } from '@/lib/storage';

export default function OnBoard() {
  const supabase = createClientComponentClient<Database>();
  const [email, setEmail] = useState("");
  const [userid, setUserid] = useState("");
  const { push } = useRouter();
  useEffect(() => {
    const fetchSession = async () => {
      const { data: { session: fetchedSession } } = await supabase.auth.getSession();
      if (fetchedSession) { }
      else {
        push("/login")
      }
      if (fetchedSession) {
        //@ts-ignore
        setEmail(fetchedSession.user.email);
        setUserid(fetchedSession.user.id);
        const { data: users, error } = await supabase
          .from('users')
          .select('*')
          .in('id', [userid]);
        console.log(error)
        console.log(users)
        //@ts-ignore
        console.log(users);
        if (users.length == 0) {
          push("/onboard")
        }
      }
    };

    fetchSession();
  }, []);

  return (
    <>
      {email} {userid}
    </>
  )
}
