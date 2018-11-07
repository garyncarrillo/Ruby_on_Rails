require 'test_helper'

class TwallesDsControllerTest < ActionDispatch::IntegrationTest
  setup do
    @twalles_d = twalles_ds(:one)
  end

  test "should get index" do
    get twalles_ds_url
    assert_response :success
  end

  test "should get new" do
    get new_twalles_d_url
    assert_response :success
  end

  test "should create twalles_d" do
    assert_difference('TwallesD.count') do
      post twalles_ds_url, params: { twalles_d: { dias_mora: @twalles_d.dias_mora, estado: @twalles_d.estado, fecgrab: @twalles_d.fecgrab, fecha_pago: @twalles_d.fecha_pago, idcobrador: @twalles_d.idcobrador, idcredito: @twalles_d.idcredito, numero_pago: @twalles_d.numero_pago, pago_capital: @twalles_d.pago_capital, pago_interes: @twalles_d.pago_interes, pago_mora: @twalles_d.pago_mora, usergrab: @twalles_d.usergrab, valor_recaudado: @twalles_d.valor_recaudado } }
    end

    assert_redirected_to twalles_d_url(TwallesD.last)
  end

  test "should show twalles_d" do
    get twalles_d_url(@twalles_d)
    assert_response :success
  end

  test "should get edit" do
    get edit_twalles_d_url(@twalles_d)
    assert_response :success
  end

  test "should update twalles_d" do
    patch twalles_d_url(@twalles_d), params: { twalles_d: { dias_mora: @twalles_d.dias_mora, estado: @twalles_d.estado, fecgrab: @twalles_d.fecgrab, fecha_pago: @twalles_d.fecha_pago, idcobrador: @twalles_d.idcobrador, idcredito: @twalles_d.idcredito, numero_pago: @twalles_d.numero_pago, pago_capital: @twalles_d.pago_capital, pago_interes: @twalles_d.pago_interes, pago_mora: @twalles_d.pago_mora, usergrab: @twalles_d.usergrab, valor_recaudado: @twalles_d.valor_recaudado } }
    assert_redirected_to twalles_d_url(@twalles_d)
  end

  test "should destroy twalles_d" do
    assert_difference('TwallesD.count', -1) do
      delete twalles_d_url(@twalles_d)
    end

    assert_redirected_to twalles_ds_url
  end
end
