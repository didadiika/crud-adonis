import { Settings } from 'luxon'
import env from '#start/env'

Settings.defaultZone = env.get('TZ') || 'UTC+7'