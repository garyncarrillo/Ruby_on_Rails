class TwalletsCsController < ApplicationController
  before_action :set_twallets_c, only: [:show, :edit, :update, :destroy]

  # GET /twallets_cs
  # GET /twallets_cs.json
  def index
    @twallets_cs = TwalletsC.all
  end

  # GET /twallets_cs/1
  # GET /twallets_cs/1.json
  def show
  end

  # GET /twallets_cs/new
  def new
    @twallets_c = TwalletsC.new
  end

  # GET /twallets_cs/1/edit
  def edit
  end

  # POST /twallets_cs
  # POST /twallets_cs.json
  def create
    @twallets_c = TwalletsC.new(twallets_c_params)

    respond_to do |format|
      if @twallets_c.save
        format.html { redirect_to @twallets_c, notice: 'Twallets c was successfully created.' }
        format.json { render :show, status: :created, location: @twallets_c }
      else
        format.html { render :new }
        format.json { render json: @twallets_c.errors, status: :unprocessable_entity }
      end
    end
  end

  # PATCH/PUT /twallets_cs/1
  # PATCH/PUT /twallets_cs/1.json
  def update
    respond_to do |format|
      if @twallets_c.update(twallets_c_params)
        format.html { redirect_to @twallets_c, notice: 'Twallets c was successfully updated.' }
        format.json { render :show, status: :ok, location: @twallets_c }
      else
        format.html { render :edit }
        format.json { render json: @twallets_c.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /twallets_cs/1
  # DELETE /twallets_cs/1.json
  def destroy
    @twallets_c.destroy
    respond_to do |format|
      format.html { redirect_to twallets_cs_url, notice: 'Twallets c was successfully destroyed.' }
      format.json { head :no_content }
    end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_twallets_c
      @twallets_c = TwalletsC.find(params[:id])
    end

    # Never trust parameters from the scary internet, only allow the white list through.
    def twallets_c_params
      params.require(:twallets_c).permit(:idcredito, :idcliente, :idcuota, :idpago, :idinteres, :idinteres_mora, :valor_capital, :valor_interes, :valor_mora, :valor_capital_pagado, :valor_interes_pagado, :valor_interes_mora_pagado, :numero_cuota, :numero_cuota_pendiente, :fechainicio, :fechafin, :fecgrab, :usergrab, :estado)
    end
end
