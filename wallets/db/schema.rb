# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 20180417015853) do

  create_table "tclientes", force: :cascade, options: "ENGINE=InnoDB DEFAULT CHARSET=utf8" do |t|
    t.string "idcliente"
    t.string "nombres"
    t.string "apellidos"
    t.string "direccion"
    t.string "celular"
    t.string "correo"
    t.string "estado"
    t.string "fecgrab"
    t.string "usergrab"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "tcobradors", force: :cascade, options: "ENGINE=InnoDB DEFAULT CHARSET=utf8" do |t|
    t.string "idcobrador"
    t.string "clave"
    t.string "correo"
    t.string "celular"
    t.string "direccion"
    t.string "estado"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "tcreditos", force: :cascade, options: "ENGINE=InnoDB DEFAULT CHARSET=utf8" do |t|
    t.string "idcredito"
    t.string "valor"
    t.string "descripcion"
    t.string "estado"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "tcuota", force: :cascade, options: "ENGINE=InnoDB DEFAULT CHARSET=utf8" do |t|
    t.string "idcuota"
    t.string "valor"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "tinteres", force: :cascade, options: "ENGINE=InnoDB DEFAULT CHARSET=utf8" do |t|
    t.string "idinteres"
    t.string "valor"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "ttpagos", force: :cascade, options: "ENGINE=InnoDB DEFAULT CHARSET=utf8" do |t|
    t.string "idpago"
    t.string "descripcion"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "twalles_ds", force: :cascade, options: "ENGINE=InnoDB DEFAULT CHARSET=utf8" do |t|
    t.string "idcredito"
    t.string "idcobrador"
    t.decimal "numero_pago", precision: 10
    t.decimal "valor_recaudado", precision: 10
    t.decimal "pago_capital", precision: 10
    t.decimal "pago_interes", precision: 10
    t.decimal "pago_mora", precision: 10
    t.string "fecha_pago"
    t.string "fecgrab"
    t.string "usergrab"
    t.string "dias_mora"
    t.decimal "estado", precision: 10
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "twallets_cs", force: :cascade, options: "ENGINE=InnoDB DEFAULT CHARSET=utf8" do |t|
    t.string "idcredito"
    t.string "idcliente"
    t.string "idcuota"
    t.string "idpago"
    t.string "idinteres"
    t.string "idinteres_mora"
    t.decimal "valor_capital", precision: 10
    t.decimal "valor_interes", precision: 10
    t.decimal "valor_mora", precision: 10
    t.decimal "valor_capital_pagado", precision: 10
    t.decimal "valor_interes_pagado", precision: 10
    t.decimal "valor_interes_mora_pagado", precision: 10
    t.decimal "numero_cuota", precision: 10
    t.decimal "numero_cuota_pendiente", precision: 10
    t.string "fechainicio"
    t.string "fechafin"
    t.string "fecgrab"
    t.string "usergrab"
    t.string "estado"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

end
