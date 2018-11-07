json.extract! twallets_c, :id, :idcredito, :idcliente, :idcuota, :idpago, :idinteres, :idinteres_mora, :valor_capital, :valor_interes, :valor_mora, :valor_capital_pagado, :valor_interes_pagado, :valor_interes_mora_pagado, :numero_cuota, :numero_cuota_pendiente, :fechainicio, :fechafin, :fecgrab, :usergrab, :estado, :created_at, :updated_at
json.url twallets_c_url(twallets_c, format: :json)
