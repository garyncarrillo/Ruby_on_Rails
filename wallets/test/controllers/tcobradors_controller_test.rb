require 'test_helper'

class TcobradorsControllerTest < ActionDispatch::IntegrationTest
  setup do
    @tcobrador = tcobradors(:one)
  end

  test "should get index" do
    get tcobradors_url
    assert_response :success
  end

  test "should get new" do
    get new_tcobrador_url
    assert_response :success
  end

  test "should create tcobrador" do
    assert_difference('Tcobrador.count') do
      post tcobradors_url, params: { tcobrador: { celular: @tcobrador.celular, clave: @tcobrador.clave, correo: @tcobrador.correo, direccion: @tcobrador.direccion, estado: @tcobrador.estado, idcobrador: @tcobrador.idcobrador } }
    end

    assert_redirected_to tcobrador_url(Tcobrador.last)
  end

  test "should show tcobrador" do
    get tcobrador_url(@tcobrador)
    assert_response :success
  end

  test "should get edit" do
    get edit_tcobrador_url(@tcobrador)
    assert_response :success
  end

  test "should update tcobrador" do
    patch tcobrador_url(@tcobrador), params: { tcobrador: { celular: @tcobrador.celular, clave: @tcobrador.clave, correo: @tcobrador.correo, direccion: @tcobrador.direccion, estado: @tcobrador.estado, idcobrador: @tcobrador.idcobrador } }
    assert_redirected_to tcobrador_url(@tcobrador)
  end

  test "should destroy tcobrador" do
    assert_difference('Tcobrador.count', -1) do
      delete tcobrador_url(@tcobrador)
    end

    assert_redirected_to tcobradors_url
  end
end
