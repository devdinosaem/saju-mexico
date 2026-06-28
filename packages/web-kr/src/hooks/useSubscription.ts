"use client"
import { useEffect, useState } from "react"
import {
  loadSubscription, EMPTY_SUBSCRIPTION, SUBSCRIPTION_CHANGE_EVENT,
  type Subscription,
} from "@/lib/subscription"

/** 구독 상태 실시간 구독 훅. */
export function useSubscription(): Subscription {
  const [sub, setSub] = useState<Subscription>(EMPTY_SUBSCRIPTION)
  useEffect(() => {
    const update = () => setSub(loadSubscription())
    update()
    window.addEventListener(SUBSCRIPTION_CHANGE_EVENT, update)
    window.addEventListener("storage", update)
    return () => {
      window.removeEventListener(SUBSCRIPTION_CHANGE_EVENT, update)
      window.removeEventListener("storage", update)
    }
  }, [])
  return sub
}
