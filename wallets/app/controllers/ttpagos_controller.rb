class TtpagosController < ApplicationController
  before_action :set_ttpago, only: [:show, :edit, :update, :destroy]

  # GET /ttpagos
  # GET /ttpagos.json
  def index
    @ttpagos = Ttpago.all
  end

  # GET /ttpagos/1
  # GET /ttpagos/1.json
  def show
  end

  # GET /ttpagos/new
  def new
    @ttpago = Ttpago.new
  end

  # GET /ttpagos/1/edit
  def edit
  end

  # POST /ttpagos
  # POST /ttpagos.json
  def create
    @ttpago = Ttpago.new(ttpago_params)

    respond_to do |format|
      if @ttpago.save
        format.html { redirect_to @ttpago, notice: 'Ttpago was successfully created.' }
        format.json { render :show, status: :created, location: @ttpago }
      else
        format.html { render :new }
        format.json { render json: @ttpago.errors, status: :unprocessable_entity }
      end
    end
  end

  # PATCH/PUT /ttpagos/1
  # PATCH/PUT /ttpagos/1.json
  def update
    respond_to do |format|
      if @ttpago.update(ttpago_params)
        format.html { redirect_to @ttpago, notice: 'Ttpago was successfully updated.' }
        format.json { render :show, status: :ok, location: @ttpago }
      else
        format.html { render :edit }
        format.json { render json: @ttpago.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /ttpagos/1
  # DELETE /ttpagos/1.json
  def destroy
    @ttpago.destroy
    respond_to do |format|
      format.html { redirect_to ttpagos_url, notice: 'Ttpago was successfully destroyed.' }
      format.json { head :no_content }
    end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_ttpago
      @ttpago = Ttpago.find(params[:id])
    end

    # Never trust parameters from the scary internet, only allow the white list through.
    def ttpago_params
      params.require(:ttpago).permit(:idpago, :descripcion)
    end
end
