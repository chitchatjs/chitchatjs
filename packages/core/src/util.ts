import { LaunchTrigger, UtteranceTrigger } from './types'

export function isLaunchTrigger(arg: any): arg is LaunchTrigger {
    return arg && !arg.texts // Hacky for now TODO
}

export function isUtteranceTrigger(arg: any): arg is UtteranceTrigger {
    return arg && arg.texts // Hacky for now TODO
}