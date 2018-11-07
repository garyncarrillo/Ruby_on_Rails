require 'test_helper'

class TclientesControllerTest < ActionDispatch::IntegrationTest
  setup do
    @tcliente = tclientes(:one)
  end

  test "should get index" do
    get tclientes_url
    assert_response :success
  end

  test "should get new" do
    get new_tcliente_url
    assert_response :success
  end

  test "should create tcliente" do
    assert_difference('Tcliente.count') do
      post tclientes_url, params: { tcliente: { apellidos: @tcliente.apellidos, celular: @tcliente.celular, correo: @tcliente.correo, direccion: @tcliente.direccion, estado: @tcliente.estado, fecgrab: @tcliente.fecgrab, idcliente: @tcliente.idcliente, nombres: @tcliente.nombres, usergrab: @tcliente.usergrab } }
    end

    assert_redirected_to tcliente_url(Tcliente.last)
  end

  test "should show tcliente" do
    get tcliente_url(@tcliente)
    assert_response :success
  end

  test "should get edit" do
    get edit_tcliente_url(@tcliente)
    assert_response :success
  end

  test "should update tcliente" do
    patch tcliente_url(@tcliente), params: { tcliente: { apellidos: @tcliente.apellidos, celular: @tcliente.celular, correo: @tcliente.correo, direccion: @tcliente.direccion, estado: @tcliente.estado, fecgrab: @tcliente.fecgrab, idcliente: @tcliente.idcliente, nombres: @tcliente.nombres, usergrab: @tcliente.usergrab } }
    assert_redirected_to tcliente_url(@tcliente)
  end

  test "should destroy tcliente" do
    assert_difference('Tcliente.count', -1) do
      delete tcliente_url(@tcliente)
    end

    assert_redirected_to tclientes_url
  end
end
