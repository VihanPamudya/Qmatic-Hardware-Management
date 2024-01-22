import { SystemInfoEffects } from './system-info.effects';
import { LicenseInfoEffects } from './license.effects';
import { UserRoleEffects } from './user-role.effects';
import { AccountEffects } from './account.effects';
import { BranchEffects } from './branch.effects';
import { UserEffects } from './user.effects';
import { UnitEffects } from './unit.effects';
import { DeviceEffects } from './device.effects';

export const effects: any[] = [
  SystemInfoEffects,
  LicenseInfoEffects,
  UserRoleEffects,
  AccountEffects,
  BranchEffects,
  UserEffects,
  UnitEffects,
  DeviceEffects
];

export * from './system-info.effects';
export * from './license.effects';
export * from './user-role.effects';
export * from './account.effects';
export * from './branch.effects';
export * from './user.effects';
export * from './unit.effects';
export * from './device.effects';
