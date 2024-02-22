import { AccountsCoder } from "@project-serum/anchor";
import {
  accountsCoder,
  ControllerData,
  PairData,
  UserProfileData,
  LockProfileData,
  AccountName,
  ControllerV1Data,
} from "../types";

/**
 * Static abstract class definition to parse entities.
 * @category Parsables
 */
export interface ParsableEntity<T> {
  /**
   * Parse account data
   *
   * @param accountData Buffer data for the entity
   * @returns Parsed entity
   */
  parse: (accountData: Buffer | undefined | null) => T | null;
}

/**
 * Class decorator to define an interface with static methods
 * Reference: https://github.com/Microsoft/TypeScript/issues/13462#issuecomment-295685298
 */
function staticImplements<T>() {
  return <U extends T>(constructor: U) => {
    constructor;
  };
}

function parseAnchorAccount(accountName: AccountName, data: Buffer) {
  const discriminator = AccountsCoder.accountDiscriminator(accountName);
  if (discriminator.compare(data.slice(0, 8))) {
    console.error("incorrect account name during parsing");
    return null;
  }

  try {
    return accountsCoder.decode(accountName, data);
  } catch (_e) {
    console.error("unknown account name during parsing");
    return null;
  }
}

// YOUR ACCOUNTS
@staticImplements<ParsableEntity<PairData>>()
export class ParsablePair {
  private constructor() {}

  public static parse(data: Buffer | undefined | null): PairData | null {
    if (!data) {
      return null;
    }

    try {
      return parseAnchorAccount(AccountName.Pair, data);
    } catch (e) {
      console.error(`error while parsing Pair: ${e}`);
      return null;
    }
  }
}

@staticImplements<ParsableEntity<UserProfileData>>()
export class ParsableUserProfile {
  private constructor() {}

  public static parse(data: Buffer | undefined | null): UserProfileData | null {
    if (!data) {
      return null;
    }

    try {
      return parseAnchorAccount(AccountName.UserProfile, data);
    } catch (e) {
      console.error(`error while parsing UserProfile: ${e}`);
      return null;
    }
  }
}

@staticImplements<ParsableEntity<LockProfileData>>()
export class ParsableLockProfile {
  private constructor() {}

  public static parse(data: Buffer | undefined | null): LockProfileData | null {
    if (!data) {
      return null;
    }

    try {
      return parseAnchorAccount(AccountName.LockProfile, data);
    } catch (e) {
      console.error(`error while parsing LockProfile: ${e}`);
      return null;
    }
  }
}

@staticImplements<ParsableEntity<ControllerData>>()
export class ParsableController {
  private constructor() {}

  public static parse(data: Buffer | undefined | null): ControllerData | null {
    if (!data) {
      return null;
    }

    try {
      return parseAnchorAccount(AccountName.Controller, data);
    } catch (e) {
      console.error(`error while parsing Controller: ${e}`);
      return null;
    }
  }
}

@staticImplements<ParsableEntity<ControllerV1Data>>()
export class ParsableControllerV1 {
  private constructor() {}

  public static parse(data: Buffer | undefined | null): ControllerV1Data | null {
    if (!data) {
      return null;
    }

    try {
      return parseAnchorAccount(AccountName.ControllerV1, data);
    } catch (e) {
      console.error(`error while parsing Controller V1: ${e}`);
      return null;
    }
  }
}
