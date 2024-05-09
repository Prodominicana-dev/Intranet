"use client";
import {
  Menu,
  MenuHandler,
  MenuItem,
  MenuList,
} from "@material-tailwind/react";
import Link from "next/link";
import React from "react";
import { FaAlignJustify, FaBarsStaggered } from "react-icons/fa6";

export default function Sidebar() {
  return (
    <div className="w-3/12 h-full overflow-y-auto  text-black flex flex-col gap-3 p-5">
      <button className="flex flex-row w-full justify-center items-center text-lg font-semibold hover:bg-gray-200 duration-300 bg-white py-4 rounded-lg">
        <div className="w-4/12 flex justify-center">
          <FaBarsStaggered className="size-5" />
        </div>{" "}
        <h1 className="w-full text-left">Inicio</h1>
      </button>
      <Menu allowHover placement="right-start">
        <MenuHandler className="flex flex-row w-full justify-center items-center text-lg font-semibold hover:bg-gray-200 duration-300 bg-white py-4 rounded-lg">
          <div>
            <div className="w-4/12 flex justify-center">
              <FaAlignJustify className="size-5" />
            </div>
            <h1 className="w-full text-left">Recursos Humanos</h1>
          </div>
        </MenuHandler>
        <MenuList
          className="w-64 p-2"
          placeholder={undefined}
          onPointerEnterCapture={undefined}
          onPointerLeaveCapture={undefined}
        >
          <MenuItem
            placeholder={undefined}
            onPointerEnterCapture={undefined}
            onPointerLeaveCapture={undefined}
            disabled
          >
            <h1 className="text-lg">Reclutamiento</h1>
          </MenuItem>
          <MenuItem
            placeholder={undefined}
            onPointerEnterCapture={undefined}
            onPointerLeaveCapture={undefined}
          >
            <Link href="/vacancy" className="text-lg">
              Vacantes
            </Link>
          </MenuItem>
          <MenuItem
            placeholder={undefined}
            onPointerEnterCapture={undefined}
            onPointerLeaveCapture={undefined}
          >
            <Link href="/question" className="text-lg">
              Preguntas y Respuestas
            </Link>
          </MenuItem>
          <MenuItem
            placeholder={undefined}
            onPointerEnterCapture={undefined}
            onPointerLeaveCapture={undefined}
          >
            <Link href="/vacancy/category" className="text-lg">
             categoría
            </Link>
          </MenuItem>
          <MenuItem
            placeholder={undefined}
            onPointerEnterCapture={undefined}
            onPointerLeaveCapture={undefined}
          >
            <Link href="/vacancy/degree" className="text-lg">
             Grados
            </Link>
          </MenuItem>
          <hr className="my-3" />
        </MenuList>
      </Menu>
      <button className="flex flex-row w-full justify-center items-center text-lg font-semibold hover:bg-gray-200 duration-300 bg-white py-4 rounded-lg">
        <div className="w-4/12 flex justify-center">
          <FaAlignJustify className="size-5" />
        </div>{" "}
        <h1 className="w-full text-left">Inicio</h1>
      </button>
    </div>
  );
}
