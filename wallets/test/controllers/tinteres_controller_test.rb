require 'test_helper'

class TinteresControllerTest < ActionDispatch::IntegrationTest
  setup do
    @tintere = tinteres(:one)
  end

  test "should get index" do
    get tinteres_url
    assert_response :success
  end

  test "should get new" do
    get new_tintere_url
    assert_response :success
  end

  test "should create tintere" do
    assert_difference('Tintere.count') do
      post tinteres_url, params: { tintere: { idinteres: @tintere.idinteres, valor: @tintere.valor } }
    end

    assert_redirected_to tintere_url(Tintere.last)
  end

  test "should show tintere" do
    get tintere_url(@tintere)
    assert_response :success
  end

  test "should get edit" do
    get edit_tintere_url(@tintere)
    assert_response :success
  end

  test "should update tintere" do
    patch tintere_url(@tintere), params: { tintere: { idinteres: @tintere.idinteres, valor: @tintere.valor } }
    assert_redirected_to tintere_url(@tintere)
  end

  test "should destroy tintere" do
    assert_difference('Tintere.count', -1) do
      delete tintere_url(@tintere)
    end

    assert_redirected_to tinteres_url
  end
end
