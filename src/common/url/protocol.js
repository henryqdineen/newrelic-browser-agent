/*
 * Copyright 2020 New Relic Corporation. All rights reserved.
 * SPDX-License-Identifier: Apache-2.0
 */
import { getGlobalScope } from '../util/global-scope'

export const protocol = {
  isFileProtocol: isFileProtocol,
  supportabilityMetricSent: false
}

function isFileProtocol () {
  let isFile = Boolean(getGlobalScope()?.location?.protocol === 'file:')
  if (isFile) {
    //metrics.recordSupportability('Generic/FileProtocol/Detected') -- may be implemented later? Probably make sure it's once per window
    protocol.supportabilityMetricSent = true
  }
  return isFile
}
