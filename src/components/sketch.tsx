"use client";

import React from "react";
import { Breadcrumbs } from "@material-tailwind/react";
import Link from "next/link";
import { HomeIcon } from "@heroicons/react/24/solid";

export default function Sketch({
  title,
  subtitle,
  handleFilterOpen,
  children,
  buttons,
  hasFilter = true,
  breadcrumbs,
}: {
  title: string;
  subtitle?: string;
  handleFilterOpen: () => void;
  children: React.ReactNode;
  buttons: { name: string; onClick: () => void }[];
  hasFilter?: boolean;
  breadcrumbs?: { name: string; href?: string }[];
}) {
  return (
    <>
      <div className="w-full min-h-[85vh] space-y-4 flex flex-col items-center p-8">
        {breadcrumbs && (
          <div className="w-full">
            <Breadcrumbs
              onPointerEnterCapture={undefined}
              onPointerLeaveCapture={undefined}
              placeholder={undefined}
            >
              <Link href="/" className="opacity-60 hover:text-black">
                <HomeIcon className="size-4 hover:text-black" />
              </Link>
              {breadcrumbs?.map((breadcrumb, key) => (
                <div key={key}>
                  {key === breadcrumbs.length - 1 ? (
                    <span className="text-black">{breadcrumb.name}</span>
                  ) : (
                    <>
                      {breadcrumb.href ? (
                        <Link
                          href={breadcrumb.href}
                          className="opacity-60 hover:text-black"
                        >
                          {breadcrumb.name}
                        </Link>
                      ) : (
                        <span className="text-black opacity-60">
                          {breadcrumb.name}
                        </span>
                      )}
                    </>
                  )}
                </div>
              ))}
            </Breadcrumbs>
          </div>
        )}
        <div className="w-full py-2 flex justify-between items-center text-black">
          <div className="flex flex-col w-full">
            <div className="font-extrabold text-4xl line-clamp-1">{title}</div>
            {subtitle && (
              <label className="text-base font-normal line-clamp-1">
                {subtitle}
              </label>
            )}
          </div>
          <div
            className={`${
              hasFilter ? "space-x-4" : ""
            } w-full flex justify-end`}
          >
            {buttons?.map((button, key) => {
              return (
                <button
                  key={key}
                  onClick={button.onClick}
                  className="min-w-36 px-8 h-12 rounded-full bg-blue-900 text-white hover:text-white/80 hover:shadow-md"
                >
                  {button.name}
                </button>
              );
            })}
            {hasFilter && (
              <button
                onClick={handleFilterOpen}
                className="w-36 h-12 rounded-full border-[1px] border-gray-400 text-gray-400 hover:text-gray-400/80 hover:shadow-sm"
              >
                Filtrar
              </button>
            )}
          </div>
        </div>
        {children}
      </div>
    </>
  );
}
