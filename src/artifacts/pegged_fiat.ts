export type PeggedFiat = {
  "version": "0.1.0",
  "name": "pegged_fiat",
  "instructions": [
    {
      "name": "initializeV1",
      "accounts": [
        {
          "name": "owner",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "controller",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "tokenMint",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "rent",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "bump",
          "type": "u8"
        },
        {
          "name": "decimals",
          "type": "u8"
        },
        {
          "name": "tokenName",
          "type": "string"
        },
        {
          "name": "tokenSymbol",
          "type": "string"
        }
      ]
    },
    {
      "name": "mintToV1",
      "accounts": [
        {
          "name": "mintAuthority",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "controller",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "tokenMint",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "recipient",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "recipientTokenAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "rent",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "associatedTokenProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "amount",
          "type": "u64"
        }
      ]
    },
    {
      "name": "setAuthorityV1",
      "accounts": [
        {
          "name": "owner",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "controllerV1",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "newController",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "tokenMint",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": []
    },
    {
      "name": "initialize",
      "accounts": [
        {
          "name": "authority",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "controller",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "oracleProgramId",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "rent",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "bump",
          "type": "u8"
        },
        {
          "name": "version",
          "type": "u16"
        }
      ]
    },
    {
      "name": "addPair",
      "accounts": [
        {
          "name": "authority",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "controller",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "pair",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "lockToken",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "mintToken",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "lockTokenVault",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "burnTokenVault",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "oracleProduct",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "rent",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "version",
          "type": "u16"
        },
        {
          "name": "bump",
          "type": "u8"
        },
        {
          "name": "fee",
          "type": "u64"
        },
        {
          "name": "safeMargin",
          "type": "u64"
        },
        {
          "name": "expo",
          "type": "i32"
        },
        {
          "name": "maxPrice",
          "type": "u64"
        },
        {
          "name": "minPrice",
          "type": "u64"
        }
      ]
    },
    {
      "name": "initUserProfile",
      "accounts": [
        {
          "name": "user",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "pair",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "userProfile",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "lockProfile",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "rent",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "userProfileBump",
          "type": "u8"
        },
        {
          "name": "lockProfileBump",
          "type": "u8"
        }
      ]
    },
    {
      "name": "initLockProfile",
      "accounts": [
        {
          "name": "user",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "pair",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "userProfile",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "oldLockProfile",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "newLockProfile",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "rent",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "index",
          "type": "u16"
        },
        {
          "name": "lockProfileBump",
          "type": "u8"
        }
      ]
    },
    {
      "name": "lockNMint",
      "accounts": [
        {
          "name": "user",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "pair",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "lockTokenUser",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "lockTokenVault",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "mintToken",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "lockToken",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "mintTokenUser",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "oracleProduct",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "oraclePrice",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "userProfile",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "lockProfile",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "rent",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "associatedTokenProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "lockAmount",
          "type": "u64"
        }
      ]
    },
    {
      "name": "onOffPair",
      "accounts": [
        {
          "name": "authority",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "controller",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "pair",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "isOn",
          "type": "bool"
        }
      ]
    },
    {
      "name": "burnNUnlock",
      "accounts": [
        {
          "name": "user",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "pair",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "mintToken",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "lockTokenVault",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "unlockTokenUser",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "burnTokenUser",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "userProfile",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "lockProfile",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "rent",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "numBurntIndex",
          "type": "u64"
        }
      ]
    },
    {
      "name": "lockWithoutMint",
      "accounts": [
        {
          "name": "authority",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "controller",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "pair",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "lockTokenUser",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "lockTokenVault",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "mintToken",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "lockToken",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "userProfile",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "lockProfile",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "rent",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "associatedTokenProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "lockAmount",
          "type": "u64"
        },
        {
          "name": "mintAmount",
          "type": "u64"
        }
      ]
    }
  ],
  "accounts": [
    {
      "name": "controller",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "version",
            "type": "u16"
          },
          {
            "name": "authority",
            "type": "publicKey"
          },
          {
            "name": "oracleProgramId",
            "type": "publicKey"
          },
          {
            "name": "bump",
            "type": {
              "array": [
                "u8",
                1
              ]
            }
          }
        ]
      }
    },
    {
      "name": "controllerV1",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "tokenName",
            "type": "string"
          },
          {
            "name": "tokenSymbol",
            "type": "string"
          },
          {
            "name": "tokenMint",
            "type": "publicKey"
          },
          {
            "name": "mintAuthority",
            "type": "publicKey"
          },
          {
            "name": "freezeAuthority",
            "type": "publicKey"
          },
          {
            "name": "bump",
            "type": {
              "array": [
                "u8",
                1
              ]
            }
          }
        ]
      }
    },
    {
      "name": "lockProfile",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "user",
            "type": "publicKey"
          },
          {
            "name": "totalLocked",
            "type": "u64"
          },
          {
            "name": "totalMinted",
            "type": "u64"
          },
          {
            "name": "prev",
            "type": "publicKey"
          },
          {
            "name": "bump",
            "type": {
              "array": [
                "u8",
                1
              ]
            }
          },
          {
            "name": "priceHistory",
            "type": {
              "vec": {
                "defined": "PriceProfile"
              }
            }
          }
        ]
      }
    },
    {
      "name": "product",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "version",
            "type": "u16"
          },
          {
            "name": "status",
            "type": {
              "defined": "ProductStatus"
            }
          },
          {
            "name": "assetType",
            "type": {
              "defined": "AssetType"
            }
          },
          {
            "name": "quoteCurrency",
            "type": "string"
          },
          {
            "name": "quoteMint",
            "type": "publicKey"
          },
          {
            "name": "baseCurrency",
            "type": "string"
          },
          {
            "name": "baseMint",
            "type": "publicKey"
          },
          {
            "name": "priceAccount",
            "type": "publicKey"
          },
          {
            "name": "expo",
            "type": "i32"
          },
          {
            "name": "maxPrice",
            "type": "u64"
          },
          {
            "name": "minPrice",
            "type": "u64"
          },
          {
            "name": "windowSize",
            "type": "u64"
          },
          {
            "name": "controller",
            "type": "publicKey"
          },
          {
            "name": "bump",
            "type": {
              "array": [
                "u8",
                1
              ]
            }
          }
        ]
      }
    },
    {
      "name": "price",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "version",
            "type": "u16"
          },
          {
            "name": "status",
            "type": {
              "defined": "PriceStatus"
            }
          },
          {
            "name": "productAccount",
            "type": "publicKey"
          },
          {
            "name": "price",
            "type": "u64"
          },
          {
            "name": "numPublishers",
            "type": "u16"
          },
          {
            "name": "timestamp",
            "type": "u64"
          },
          {
            "name": "prevPrice",
            "type": "u64"
          },
          {
            "name": "prevTimestamp",
            "type": "u64"
          },
          {
            "name": "bump",
            "type": {
              "array": [
                "u8",
                1
              ]
            }
          }
        ]
      }
    },
    {
      "name": "pair",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "version",
            "type": "u16"
          },
          {
            "name": "state",
            "type": {
              "defined": "Status"
            }
          },
          {
            "name": "controller",
            "type": "publicKey"
          },
          {
            "name": "lockToken",
            "type": "publicKey"
          },
          {
            "name": "lockTokenVault",
            "type": "publicKey"
          },
          {
            "name": "mintToken",
            "type": "publicKey"
          },
          {
            "name": "burnTokenVault",
            "type": "publicKey"
          },
          {
            "name": "totalLocked",
            "type": "u64"
          },
          {
            "name": "totalMinted",
            "type": "u64"
          },
          {
            "name": "fee",
            "type": "u64"
          },
          {
            "name": "safeMargin",
            "type": "u64"
          },
          {
            "name": "expo",
            "type": "i32"
          },
          {
            "name": "maxPrice",
            "type": "u64"
          },
          {
            "name": "minPrice",
            "type": "u64"
          },
          {
            "name": "oracleProduct",
            "type": "publicKey"
          },
          {
            "name": "bump",
            "type": {
              "array": [
                "u8",
                1
              ]
            }
          }
        ]
      }
    },
    {
      "name": "userProfile",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "state",
            "type": {
              "defined": "AccountState"
            }
          },
          {
            "name": "pair",
            "type": "publicKey"
          },
          {
            "name": "user",
            "type": "publicKey"
          },
          {
            "name": "totalLocked",
            "type": "u64"
          },
          {
            "name": "totalMinted",
            "type": "u64"
          },
          {
            "name": "latestLockProfile",
            "type": "publicKey"
          },
          {
            "name": "lockProfileIndex",
            "type": "u16"
          },
          {
            "name": "bump",
            "type": {
              "array": [
                "u8",
                1
              ]
            }
          }
        ]
      }
    }
  ],
  "types": [
    {
      "name": "PriceProfile",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "lockAmount",
            "type": "u64"
          },
          {
            "name": "mintAmount",
            "type": "u64"
          }
        ]
      }
    },
    {
      "name": "AssetType",
      "type": {
        "kind": "enum",
        "variants": [
          {
            "name": "Forex"
          },
          {
            "name": "Crypto"
          }
        ]
      }
    },
    {
      "name": "ProductStatus",
      "type": {
        "kind": "enum",
        "variants": [
          {
            "name": "Unknown"
          },
          {
            "name": "Offline"
          },
          {
            "name": "Online"
          }
        ]
      }
    },
    {
      "name": "PriceStatus",
      "type": {
        "kind": "enum",
        "variants": [
          {
            "name": "Unknown"
          },
          {
            "name": "Offline"
          },
          {
            "name": "Online"
          }
        ]
      }
    },
    {
      "name": "Status",
      "type": {
        "kind": "enum",
        "variants": [
          {
            "name": "Unknown"
          },
          {
            "name": "Inactive"
          },
          {
            "name": "Active"
          }
        ]
      }
    },
    {
      "name": "AccountState",
      "type": {
        "kind": "enum",
        "variants": [
          {
            "name": "Unknown"
          },
          {
            "name": "Active"
          },
          {
            "name": "Inactive"
          }
        ]
      }
    }
  ],
  "events": [
    {
      "name": "BurnNUnlockEvent",
      "fields": [
        {
          "name": "slot",
          "type": "u64",
          "index": true
        },
        {
          "name": "timestamp",
          "type": "u64",
          "index": true
        },
        {
          "name": "user",
          "type": "publicKey",
          "index": true
        },
        {
          "name": "lockToken",
          "type": "publicKey",
          "index": true
        },
        {
          "name": "mintToken",
          "type": "publicKey",
          "index": true
        },
        {
          "name": "numBurnt",
          "type": "u64",
          "index": true
        },
        {
          "name": "burnAmount",
          "type": "u64",
          "index": true
        },
        {
          "name": "unlockAmount",
          "type": "u64",
          "index": true
        }
      ]
    },
    {
      "name": "LockNMintEvent",
      "fields": [
        {
          "name": "slot",
          "type": "u64",
          "index": true
        },
        {
          "name": "timestamp",
          "type": "u64",
          "index": true
        },
        {
          "name": "user",
          "type": "publicKey",
          "index": true
        },
        {
          "name": "lockToken",
          "type": "publicKey",
          "index": true
        },
        {
          "name": "mintToken",
          "type": "publicKey",
          "index": true
        },
        {
          "name": "lockAmount",
          "type": "u64",
          "index": true
        },
        {
          "name": "mintAmount",
          "type": "u64",
          "index": true
        }
      ]
    },
    {
      "name": "LockNMintEvent",
      "fields": [
        {
          "name": "slot",
          "type": "u64",
          "index": true
        },
        {
          "name": "timestamp",
          "type": "u64",
          "index": true
        },
        {
          "name": "authority",
          "type": "publicKey",
          "index": true
        },
        {
          "name": "lockToken",
          "type": "publicKey",
          "index": true
        },
        {
          "name": "mintToken",
          "type": "publicKey",
          "index": true
        },
        {
          "name": "lockAmount",
          "type": "u64",
          "index": true
        },
        {
          "name": "mintAmount",
          "type": "u64",
          "index": true
        }
      ]
    }
  ],
  "errors": [
    {
      "code": 6000,
      "name": "InvalidInput",
      "msg": "Invalid data input"
    },
    {
      "code": 6001,
      "name": "NumberCastError",
      "msg": "Unable to cast number into BigInt"
    },
    {
      "code": 6002,
      "name": "MustBeProgramId",
      "msg": "Input must be a program id"
    },
    {
      "code": 6003,
      "name": "OwnedInvalidProgram",
      "msg": "Account is owned by invalid program"
    },
    {
      "code": 6004,
      "name": "NotMatchQuoteBase",
      "msg": "Quote or base is not match"
    },
    {
      "code": 6005,
      "name": "InsufficientTokenBalance",
      "msg": "Insufficient token balance"
    },
    {
      "code": 6006,
      "name": "InvalidPriceOfProductOracle",
      "msg": "Price of product oracle is invalid"
    },
    {
      "code": 6007,
      "name": "MathOverflow",
      "msg": "Math operation overflow"
    },
    {
      "code": 6008,
      "name": "ExpoPositiveNonSupport",
      "msg": "Positive expo is not supported"
    },
    {
      "code": 6009,
      "name": "PriceMustBeNonZero",
      "msg": "Price must be non-zero"
    },
    {
      "code": 6010,
      "name": "PriceTooOld",
      "msg": "Oracle price is too old"
    },
    {
      "code": 6011,
      "name": "AmountTooSmall",
      "msg": "amount is too small"
    },
    {
      "code": 6012,
      "name": "InvalidTimestampConversion",
      "msg": "Timestamp should be convertible from i64 to u64"
    },
    {
      "code": 6013,
      "name": "ExpoNotMatch",
      "msg": "expo of oracle and pair are not match"
    },
    {
      "code": 6014,
      "name": "PriceIsOutOfRange",
      "msg": "Oracle price is out of range"
    },
    {
      "code": 6015,
      "name": "UnavailablePair",
      "msg": "Unavailable pair"
    },
    {
      "code": 6016,
      "name": "InputInvalidPrice",
      "msg": "Input invalid price"
    },
    {
      "code": 6017,
      "name": "SafeMarginMustBeInRange",
      "msg": "Safe margin must be in range"
    },
    {
      "code": 6018,
      "name": "FeeMustBeInRange",
      "msg": "Fee must be in range"
    },
    {
      "code": 6019,
      "name": "UnavailableProduct",
      "msg": "Unavailable product Oracle"
    },
    {
      "code": 6020,
      "name": "UnavailablePrice",
      "msg": "Unavailable price Oracle"
    },
    {
      "code": 6021,
      "name": "VersionUnavailable",
      "msg": "Version unavailable"
    },
    {
      "code": 6022,
      "name": "BurntIndexInvalid",
      "msg": "Amount burnt index is invalid"
    },
    {
      "code": 6023,
      "name": "BurntPriceProfileNotFound",
      "msg": "Burnt price profile not found"
    },
    {
      "code": 6024,
      "name": "LockProfileIsFull",
      "msg": "The lock profile is full"
    },
    {
      "code": 6025,
      "name": "LockProfileIsNotFull",
      "msg": "The lock profile is not full"
    },
    {
      "code": 6026,
      "name": "LockProfileIndexIsInvalid",
      "msg": "The lock profile index is invalid"
    },
    {
      "code": 6027,
      "name": "UnavailableUser",
      "msg": "Unavailable user"
    },
    {
      "code": 6028,
      "name": "InitializedUser",
      "msg": "Initialized user"
    },
    {
      "code": 6029,
      "name": "FunctionIsUnavailable",
      "msg": "Function is unavailable"
    }
  ]
};

export const IDL: PeggedFiat = {
  "version": "0.1.0",
  "name": "pegged_fiat",
  "instructions": [
    {
      "name": "initializeV1",
      "accounts": [
        {
          "name": "owner",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "controller",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "tokenMint",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "rent",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "bump",
          "type": "u8"
        },
        {
          "name": "decimals",
          "type": "u8"
        },
        {
          "name": "tokenName",
          "type": "string"
        },
        {
          "name": "tokenSymbol",
          "type": "string"
        }
      ]
    },
    {
      "name": "mintToV1",
      "accounts": [
        {
          "name": "mintAuthority",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "controller",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "tokenMint",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "recipient",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "recipientTokenAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "rent",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "associatedTokenProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "amount",
          "type": "u64"
        }
      ]
    },
    {
      "name": "setAuthorityV1",
      "accounts": [
        {
          "name": "owner",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "controllerV1",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "newController",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "tokenMint",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": []
    },
    {
      "name": "initialize",
      "accounts": [
        {
          "name": "authority",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "controller",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "oracleProgramId",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "rent",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "bump",
          "type": "u8"
        },
        {
          "name": "version",
          "type": "u16"
        }
      ]
    },
    {
      "name": "addPair",
      "accounts": [
        {
          "name": "authority",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "controller",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "pair",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "lockToken",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "mintToken",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "lockTokenVault",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "burnTokenVault",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "oracleProduct",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "rent",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "version",
          "type": "u16"
        },
        {
          "name": "bump",
          "type": "u8"
        },
        {
          "name": "fee",
          "type": "u64"
        },
        {
          "name": "safeMargin",
          "type": "u64"
        },
        {
          "name": "expo",
          "type": "i32"
        },
        {
          "name": "maxPrice",
          "type": "u64"
        },
        {
          "name": "minPrice",
          "type": "u64"
        }
      ]
    },
    {
      "name": "initUserProfile",
      "accounts": [
        {
          "name": "user",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "pair",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "userProfile",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "lockProfile",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "rent",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "userProfileBump",
          "type": "u8"
        },
        {
          "name": "lockProfileBump",
          "type": "u8"
        }
      ]
    },
    {
      "name": "initLockProfile",
      "accounts": [
        {
          "name": "user",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "pair",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "userProfile",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "oldLockProfile",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "newLockProfile",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "rent",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "index",
          "type": "u16"
        },
        {
          "name": "lockProfileBump",
          "type": "u8"
        }
      ]
    },
    {
      "name": "lockNMint",
      "accounts": [
        {
          "name": "user",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "pair",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "lockTokenUser",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "lockTokenVault",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "mintToken",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "lockToken",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "mintTokenUser",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "oracleProduct",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "oraclePrice",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "userProfile",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "lockProfile",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "rent",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "associatedTokenProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "lockAmount",
          "type": "u64"
        }
      ]
    },
    {
      "name": "onOffPair",
      "accounts": [
        {
          "name": "authority",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "controller",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "pair",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "isOn",
          "type": "bool"
        }
      ]
    },
    {
      "name": "burnNUnlock",
      "accounts": [
        {
          "name": "user",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "pair",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "mintToken",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "lockTokenVault",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "unlockTokenUser",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "burnTokenUser",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "userProfile",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "lockProfile",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "rent",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "numBurntIndex",
          "type": "u64"
        }
      ]
    },
    {
      "name": "lockWithoutMint",
      "accounts": [
        {
          "name": "authority",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "controller",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "pair",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "lockTokenUser",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "lockTokenVault",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "mintToken",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "lockToken",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "userProfile",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "lockProfile",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "rent",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "associatedTokenProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "lockAmount",
          "type": "u64"
        },
        {
          "name": "mintAmount",
          "type": "u64"
        }
      ]
    }
  ],
  "accounts": [
    {
      "name": "controller",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "version",
            "type": "u16"
          },
          {
            "name": "authority",
            "type": "publicKey"
          },
          {
            "name": "oracleProgramId",
            "type": "publicKey"
          },
          {
            "name": "bump",
            "type": {
              "array": [
                "u8",
                1
              ]
            }
          }
        ]
      }
    },
    {
      "name": "controllerV1",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "tokenName",
            "type": "string"
          },
          {
            "name": "tokenSymbol",
            "type": "string"
          },
          {
            "name": "tokenMint",
            "type": "publicKey"
          },
          {
            "name": "mintAuthority",
            "type": "publicKey"
          },
          {
            "name": "freezeAuthority",
            "type": "publicKey"
          },
          {
            "name": "bump",
            "type": {
              "array": [
                "u8",
                1
              ]
            }
          }
        ]
      }
    },
    {
      "name": "lockProfile",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "user",
            "type": "publicKey"
          },
          {
            "name": "totalLocked",
            "type": "u64"
          },
          {
            "name": "totalMinted",
            "type": "u64"
          },
          {
            "name": "prev",
            "type": "publicKey"
          },
          {
            "name": "bump",
            "type": {
              "array": [
                "u8",
                1
              ]
            }
          },
          {
            "name": "priceHistory",
            "type": {
              "vec": {
                "defined": "PriceProfile"
              }
            }
          }
        ]
      }
    },
    {
      "name": "product",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "version",
            "type": "u16"
          },
          {
            "name": "status",
            "type": {
              "defined": "ProductStatus"
            }
          },
          {
            "name": "assetType",
            "type": {
              "defined": "AssetType"
            }
          },
          {
            "name": "quoteCurrency",
            "type": "string"
          },
          {
            "name": "quoteMint",
            "type": "publicKey"
          },
          {
            "name": "baseCurrency",
            "type": "string"
          },
          {
            "name": "baseMint",
            "type": "publicKey"
          },
          {
            "name": "priceAccount",
            "type": "publicKey"
          },
          {
            "name": "expo",
            "type": "i32"
          },
          {
            "name": "maxPrice",
            "type": "u64"
          },
          {
            "name": "minPrice",
            "type": "u64"
          },
          {
            "name": "windowSize",
            "type": "u64"
          },
          {
            "name": "controller",
            "type": "publicKey"
          },
          {
            "name": "bump",
            "type": {
              "array": [
                "u8",
                1
              ]
            }
          }
        ]
      }
    },
    {
      "name": "price",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "version",
            "type": "u16"
          },
          {
            "name": "status",
            "type": {
              "defined": "PriceStatus"
            }
          },
          {
            "name": "productAccount",
            "type": "publicKey"
          },
          {
            "name": "price",
            "type": "u64"
          },
          {
            "name": "numPublishers",
            "type": "u16"
          },
          {
            "name": "timestamp",
            "type": "u64"
          },
          {
            "name": "prevPrice",
            "type": "u64"
          },
          {
            "name": "prevTimestamp",
            "type": "u64"
          },
          {
            "name": "bump",
            "type": {
              "array": [
                "u8",
                1
              ]
            }
          }
        ]
      }
    },
    {
      "name": "pair",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "version",
            "type": "u16"
          },
          {
            "name": "state",
            "type": {
              "defined": "Status"
            }
          },
          {
            "name": "controller",
            "type": "publicKey"
          },
          {
            "name": "lockToken",
            "type": "publicKey"
          },
          {
            "name": "lockTokenVault",
            "type": "publicKey"
          },
          {
            "name": "mintToken",
            "type": "publicKey"
          },
          {
            "name": "burnTokenVault",
            "type": "publicKey"
          },
          {
            "name": "totalLocked",
            "type": "u64"
          },
          {
            "name": "totalMinted",
            "type": "u64"
          },
          {
            "name": "fee",
            "type": "u64"
          },
          {
            "name": "safeMargin",
            "type": "u64"
          },
          {
            "name": "expo",
            "type": "i32"
          },
          {
            "name": "maxPrice",
            "type": "u64"
          },
          {
            "name": "minPrice",
            "type": "u64"
          },
          {
            "name": "oracleProduct",
            "type": "publicKey"
          },
          {
            "name": "bump",
            "type": {
              "array": [
                "u8",
                1
              ]
            }
          }
        ]
      }
    },
    {
      "name": "userProfile",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "state",
            "type": {
              "defined": "AccountState"
            }
          },
          {
            "name": "pair",
            "type": "publicKey"
          },
          {
            "name": "user",
            "type": "publicKey"
          },
          {
            "name": "totalLocked",
            "type": "u64"
          },
          {
            "name": "totalMinted",
            "type": "u64"
          },
          {
            "name": "latestLockProfile",
            "type": "publicKey"
          },
          {
            "name": "lockProfileIndex",
            "type": "u16"
          },
          {
            "name": "bump",
            "type": {
              "array": [
                "u8",
                1
              ]
            }
          }
        ]
      }
    }
  ],
  "types": [
    {
      "name": "PriceProfile",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "lockAmount",
            "type": "u64"
          },
          {
            "name": "mintAmount",
            "type": "u64"
          }
        ]
      }
    },
    {
      "name": "AssetType",
      "type": {
        "kind": "enum",
        "variants": [
          {
            "name": "Forex"
          },
          {
            "name": "Crypto"
          }
        ]
      }
    },
    {
      "name": "ProductStatus",
      "type": {
        "kind": "enum",
        "variants": [
          {
            "name": "Unknown"
          },
          {
            "name": "Offline"
          },
          {
            "name": "Online"
          }
        ]
      }
    },
    {
      "name": "PriceStatus",
      "type": {
        "kind": "enum",
        "variants": [
          {
            "name": "Unknown"
          },
          {
            "name": "Offline"
          },
          {
            "name": "Online"
          }
        ]
      }
    },
    {
      "name": "Status",
      "type": {
        "kind": "enum",
        "variants": [
          {
            "name": "Unknown"
          },
          {
            "name": "Inactive"
          },
          {
            "name": "Active"
          }
        ]
      }
    },
    {
      "name": "AccountState",
      "type": {
        "kind": "enum",
        "variants": [
          {
            "name": "Unknown"
          },
          {
            "name": "Active"
          },
          {
            "name": "Inactive"
          }
        ]
      }
    }
  ],
  "events": [
    {
      "name": "BurnNUnlockEvent",
      "fields": [
        {
          "name": "slot",
          "type": "u64",
          "index": true
        },
        {
          "name": "timestamp",
          "type": "u64",
          "index": true
        },
        {
          "name": "user",
          "type": "publicKey",
          "index": true
        },
        {
          "name": "lockToken",
          "type": "publicKey",
          "index": true
        },
        {
          "name": "mintToken",
          "type": "publicKey",
          "index": true
        },
        {
          "name": "numBurnt",
          "type": "u64",
          "index": true
        },
        {
          "name": "burnAmount",
          "type": "u64",
          "index": true
        },
        {
          "name": "unlockAmount",
          "type": "u64",
          "index": true
        }
      ]
    },
    {
      "name": "LockNMintEvent",
      "fields": [
        {
          "name": "slot",
          "type": "u64",
          "index": true
        },
        {
          "name": "timestamp",
          "type": "u64",
          "index": true
        },
        {
          "name": "user",
          "type": "publicKey",
          "index": true
        },
        {
          "name": "lockToken",
          "type": "publicKey",
          "index": true
        },
        {
          "name": "mintToken",
          "type": "publicKey",
          "index": true
        },
        {
          "name": "lockAmount",
          "type": "u64",
          "index": true
        },
        {
          "name": "mintAmount",
          "type": "u64",
          "index": true
        }
      ]
    },
    {
      "name": "LockNMintEvent",
      "fields": [
        {
          "name": "slot",
          "type": "u64",
          "index": true
        },
        {
          "name": "timestamp",
          "type": "u64",
          "index": true
        },
        {
          "name": "authority",
          "type": "publicKey",
          "index": true
        },
        {
          "name": "lockToken",
          "type": "publicKey",
          "index": true
        },
        {
          "name": "mintToken",
          "type": "publicKey",
          "index": true
        },
        {
          "name": "lockAmount",
          "type": "u64",
          "index": true
        },
        {
          "name": "mintAmount",
          "type": "u64",
          "index": true
        }
      ]
    }
  ],
  "errors": [
    {
      "code": 6000,
      "name": "InvalidInput",
      "msg": "Invalid data input"
    },
    {
      "code": 6001,
      "name": "NumberCastError",
      "msg": "Unable to cast number into BigInt"
    },
    {
      "code": 6002,
      "name": "MustBeProgramId",
      "msg": "Input must be a program id"
    },
    {
      "code": 6003,
      "name": "OwnedInvalidProgram",
      "msg": "Account is owned by invalid program"
    },
    {
      "code": 6004,
      "name": "NotMatchQuoteBase",
      "msg": "Quote or base is not match"
    },
    {
      "code": 6005,
      "name": "InsufficientTokenBalance",
      "msg": "Insufficient token balance"
    },
    {
      "code": 6006,
      "name": "InvalidPriceOfProductOracle",
      "msg": "Price of product oracle is invalid"
    },
    {
      "code": 6007,
      "name": "MathOverflow",
      "msg": "Math operation overflow"
    },
    {
      "code": 6008,
      "name": "ExpoPositiveNonSupport",
      "msg": "Positive expo is not supported"
    },
    {
      "code": 6009,
      "name": "PriceMustBeNonZero",
      "msg": "Price must be non-zero"
    },
    {
      "code": 6010,
      "name": "PriceTooOld",
      "msg": "Oracle price is too old"
    },
    {
      "code": 6011,
      "name": "AmountTooSmall",
      "msg": "amount is too small"
    },
    {
      "code": 6012,
      "name": "InvalidTimestampConversion",
      "msg": "Timestamp should be convertible from i64 to u64"
    },
    {
      "code": 6013,
      "name": "ExpoNotMatch",
      "msg": "expo of oracle and pair are not match"
    },
    {
      "code": 6014,
      "name": "PriceIsOutOfRange",
      "msg": "Oracle price is out of range"
    },
    {
      "code": 6015,
      "name": "UnavailablePair",
      "msg": "Unavailable pair"
    },
    {
      "code": 6016,
      "name": "InputInvalidPrice",
      "msg": "Input invalid price"
    },
    {
      "code": 6017,
      "name": "SafeMarginMustBeInRange",
      "msg": "Safe margin must be in range"
    },
    {
      "code": 6018,
      "name": "FeeMustBeInRange",
      "msg": "Fee must be in range"
    },
    {
      "code": 6019,
      "name": "UnavailableProduct",
      "msg": "Unavailable product Oracle"
    },
    {
      "code": 6020,
      "name": "UnavailablePrice",
      "msg": "Unavailable price Oracle"
    },
    {
      "code": 6021,
      "name": "VersionUnavailable",
      "msg": "Version unavailable"
    },
    {
      "code": 6022,
      "name": "BurntIndexInvalid",
      "msg": "Amount burnt index is invalid"
    },
    {
      "code": 6023,
      "name": "BurntPriceProfileNotFound",
      "msg": "Burnt price profile not found"
    },
    {
      "code": 6024,
      "name": "LockProfileIsFull",
      "msg": "The lock profile is full"
    },
    {
      "code": 6025,
      "name": "LockProfileIsNotFull",
      "msg": "The lock profile is not full"
    },
    {
      "code": 6026,
      "name": "LockProfileIndexIsInvalid",
      "msg": "The lock profile index is invalid"
    },
    {
      "code": 6027,
      "name": "UnavailableUser",
      "msg": "Unavailable user"
    },
    {
      "code": 6028,
      "name": "InitializedUser",
      "msg": "Initialized user"
    },
    {
      "code": 6029,
      "name": "FunctionIsUnavailable",
      "msg": "Function is unavailable"
    }
  ]
};
