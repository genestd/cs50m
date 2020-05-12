import { Machine, assign } from 'xstate'

export const WORK = 'WORK'
const PLAY = 'PLAY'
const WORK_TIME = 1500
const PLAY_TIME = 300
const WORK_BACKGROUND = 'hsl(225, 95%, 45%)'
const PLAY_BACKGROUND = 'hsl(118, 100%, 28%)'

export const pomodoroMachine = Machine({
  id: 'pomodoro',
  initial: 'IDLE',
  context: {
    timeRemaining: WORK_TIME,
    timeType: WORK,
    background: WORK_BACKGROUND
  },
  states: {
    IDLE: {
      on: {
        START: 'RUNNING'
      }
    },
    RUNNING: {
      invoke: {
        id: 'startTimer',
        src: (ctx, event) => (callback, onEvent) => {
          const timerId = setInterval(() => {
            callback('TICK')
          }, 1000);
          return () => clearInterval(timerId);
        }
      },
      on: {
        REFRESH: {
          target: 'PAUSED',
          actions: 'resetClock'
        },
        PAUSE: 'PAUSED',
        TICK: {
          actions: assign((ctx, e) => {
            const mutations = {
              timeRemaining: ctx.timeRemaining - 1
            }
            if (mutations.timeRemaining === 0) {
              mutations.timeType = ctx.timeType === WORK ? PLAY : WORK
              mutations.timeRemaining = ctx.timeType === WORK ? PLAY_TIME : WORK_TIME
              mutations.background = ctx.timeType === WORK ? PLAY_BACKGROUND : WORK_BACKGROUND
            }
            
            return {...ctx, ...mutations }
          })
        }
      }
    },
    PAUSED: {
      on: {
        PAUSE: 'RUNNING',
        REFRESH: {
          target: 'PAUSED',
          actions: 'resetClock'
        },
        START: 'RUNNING'
      }
    }
  }
}, {
    actions: {
      resetClock: (ctx, e) => ctx.timeRemaining = ctx.timeType === WORK ? WORK_TIME : PLAY_TIME
    },
  });
