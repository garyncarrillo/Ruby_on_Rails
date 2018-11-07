require 'test_helper'

class TwalletsCsControllerTest < ActionDispatch::IntegrationTest
  setup do
    @twallets_c = twallets_cs(:one)
  end

  test "should get index" do
    get twallets_cs_url
    assert_response :success
  end

  test "should get new" do
    get new_twallets_c_url
    assert_response :success
  end

  test "should create twallets_c" do
    assert_difference('TwalletsC.count') do
      post twallets_cs_url, params: { twallets_c: { estado: @twallets_c.estado, fecgrab: @twallets_c.fecgrab, fechafin: @twallets_c.fechafin, fechainicio: @twallets_c.fechainicio, idcliente: @twallets_c.idcliente, idcredito: @twallets_c.idcredito, idcuota: @twallets_c.idcuota, idinteres: @twallets_c.idinteres, idinteres_mora: @twallets_c.idinteres_mora, idpago: @twallets_c.idpago, numero_cuota: @twallets_c.numero_cuota, numero_cuota_pendiente: @twallets_c.numero_cuota_pendiente, usergrab: @twallets_c.usergrab, valor_capital: @twallets_c.valor_capital, valor_capital_pagado: @twallets_c.valor_capital_pagado, valor_interes: @twallets_c.valor_interes, valor_interes_mora_pagado: @twallets_c.valor_interes_mora_pagado, valor_interes_pagado: @twallets_c.valor_interes_pagado, valor_mora: @twallets_c.valor_mora } }
    end

    assert_redirected_to twallets_c_url(TwalletsC.last)
  end

  test "should show twallets_c" do
    get twallets_c_url(@twallets_c)
    assert_response :success
  end

  test "should get edit" do
    get edit_twallets_c_url(@twallets_c)
    assert_response :success
  end

  test "should update twallets_c" do
    patch twallets_c_url(@twallets_c), params: { twallets_c: { estado: @twallets_c.estado, fecgrab: @twallets_c.fecgrab, fechafin: @twallets_c.fechafin, fechainicio: @twallets_c.fechainicio, idcliente: @twallets_c.idcliente, idcredito: @twallets_c.idcredito, idcuota: @twallets_c.idcuota, idinteres: @twallets_c.idinteres, idinteres_mora: @twallets_c.idinteres_mora, idpago: @twallets_c.idpago, numero_cuota: @twallets_c.numero_cuota, numero_cuota_pendiente: @twallets_c.numero_cuota_pendiente, usergrab: @twallets_c.usergrab, valor_capital: @twallets_c.valor_capital, valor_capital_pagado: @twallets_c.valor_capital_pagado, valor_interes: @twallets_c.valor_interes, valor_interes_mora_pagado: @twallets_c.valor_interes_mora_pagado, valor_interes_pagado: @twallets_c.valor_interes_pagado, valor_mora: @twallets_c.valor_mora } }
    assert_redirected_to twallets_c_url(@twallets_c)
  end

  test "should destroy twallets_c" do
    assert_difference('TwalletsC.count', -1) do
      delete twallets_c_url(@twallets_c)
    end

    assert_redirected_to twallets_cs_url
  end
end
