require 'test_helper'

class TtpagosControllerTest < ActionDispatch::IntegrationTest
  setup do
    @ttpago = ttpagos(:one)
  end

  test "should get index" do
    get ttpagos_url
    assert_response :success
  end

  test "should get new" do
    get new_ttpago_url
    assert_response :success
  end

  test "should create ttpago" do
    assert_difference('Ttpago.count') do
      post ttpagos_url, params: { ttpago: { descripcion: @ttpago.descripcion, idpago: @ttpago.idpago } }
    end

    assert_redirected_to ttpago_url(Ttpago.last)
  end

  test "should show ttpago" do
    get ttpago_url(@ttpago)
    assert_response :success
  end

  test "should get edit" do
    get edit_ttpago_url(@ttpago)
    assert_response :success
  end

  test "should update ttpago" do
    patch ttpago_url(@ttpago), params: { ttpago: { descripcion: @ttpago.descripcion, idpago: @ttpago.idpago } }
    assert_redirected_to ttpago_url(@ttpago)
  end

  test "should destroy ttpago" do
    assert_difference('Ttpago.count', -1) do
      delete ttpago_url(@ttpago)
    end

    assert_redirected_to ttpagos_url
  end
end
