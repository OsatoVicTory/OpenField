"use client";

import { useCallback, useEffect } from "react";
import throttle from "lodash.throttle";

const useScrollThrottle = (eleId: string, scrollFn: (s: any) => void, cooldown = 500) => {

    const fn = (e: Event | null) => {
        if(!e) return;
        const { scrollTop, scrollLeft, scrollHeight, offsetHeight } = e.target as HTMLDivElement;
        // console.log(scrollTop)
        scrollFn({ x: scrollLeft, y: scrollTop, scrollHeight, offsetHeight });
    };

    const handleScroll = useCallback(throttle((e: Event) => fn(e), cooldown), []);
    // const handleScroll = useCallback((e: Event) => fn(e), []);

    useEffect(() => {
        const ele = document.getElementById(eleId);

        if(ele) ele.addEventListener('scroll', handleScroll);

        return () => {
            if(ele) ele.removeEventListener('scroll', handleScroll);
        }
    }, [eleId]);
};

export default useScrollThrottle;