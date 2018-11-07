require 'test_helper'

class TcuotaControllerTest < ActionDispatch::IntegrationTest
  setup do
    @tcuotum = tcuota(:one)
  end

  test "should get index" do
    get tcuota_url
    assert_response :success
  end

  test "should get new" do
    get new_tcuotum_url
    assert_response :success
  end

  test "should create tcuotum" do
    assert_difference('Tcuotum.count') do
      post tcuota_url, params: { tcuotum: { idcuota: @tcuotum.idcuota, valor: @tcuotum.valor } }
    end

    assert_redirected_to tcuotum_url(Tcuotum.last)
  end

  test "should show tcuotum" do
    get tcuotum_url(@tcuotum)
    assert_response :success
  end

  test "should get edit" do
    get edit_tcuotum_url(@tcuotum)
    assert_response :success
  end

  test "should update tcuotum" do
    patch tcuotum_url(@tcuotum), params: { tcuotum: { idcuota: @tcuotum.idcuota, valor: @tcuotum.valor } }
    assert_redirected_to tcuotum_url(@tcuotum)
  end

  test "should destroy tcuotum" do
    assert_difference('Tcuotum.count', -1) do
      delete tcuotum_url(@tcuotum)
    end

    assert_redirected_to tcuota_url
  end
end
