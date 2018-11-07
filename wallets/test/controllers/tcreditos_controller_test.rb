require 'test_helper'

class TcreditosControllerTest < ActionDispatch::IntegrationTest
  setup do
    @tcredito = tcreditos(:one)
  end

  test "should get index" do
    get tcreditos_url
    assert_response :success
  end

  test "should get new" do
    get new_tcredito_url
    assert_response :success
  end

  test "should create tcredito" do
    assert_difference('Tcredito.count') do
      post tcreditos_url, params: { tcredito: { descripcion: @tcredito.descripcion, estado: @tcredito.estado, idcredito: @tcredito.idcredito, valor: @tcredito.valor } }
    end

    assert_redirected_to tcredito_url(Tcredito.last)
  end

  test "should show tcredito" do
    get tcredito_url(@tcredito)
    assert_response :success
  end

  test "should get edit" do
    get edit_tcredito_url(@tcredito)
    assert_response :success
  end

  test "should update tcredito" do
    patch tcredito_url(@tcredito), params: { tcredito: { descripcion: @tcredito.descripcion, estado: @tcredito.estado, idcredito: @tcredito.idcredito, valor: @tcredito.valor } }
    assert_redirected_to tcredito_url(@tcredito)
  end

  test "should destroy tcredito" do
    assert_difference('Tcredito.count', -1) do
      delete tcredito_url(@tcredito)
    end

    assert_redirected_to tcreditos_url
  end
end
