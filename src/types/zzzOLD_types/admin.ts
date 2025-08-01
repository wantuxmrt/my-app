// types/admin.ts
export type ServerStatus = 
  | 'running' 
  | 'stopped' 
  | 'warning' 
  | 'error' 
  | 'maintenance' 
  | 'unknown';

export type ServerType = 
  | 'frontend' 
  | 'backend' 
  | 'database';

export type ServerAction = 
  | 'start' 
  | 'stop' 
  | 'restart' 
  | 'maintenance' 
  | 'emergency-restart';

export interface Server {
  id: string;
  name: string;
  type: ServerType;
  status: ServerStatus;
  cpu: number;
  memory: number;
  uptime: string;
  version: string;
}