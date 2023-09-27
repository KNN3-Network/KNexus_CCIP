import React from "react";

import { Cascader, Radio, Select, Upload } from "antd";
import { DesTooltip } from "components/common";

const tip =
  "A sampler dictates the image's calculation from input (prompt) to output (image) in latent diffusion models, influencing subsequent steps without delving into the math.";

interface ISamp {
  sampChange(e: string): void;
  sampling_method: string;
}

export const Sampler = (props: ISamp) => {
  return (
    <>
      <div className="font-[600] text-[24px] mb-3 flex items-center">
        <div>Sampler</div>
        <div className="ml-2">
          <DesTooltip text={tip} />
        </div>
      </div>
      <div>
        <Select
          size="large"
          style={{ width: "100%" }}
          value={props.sampling_method}
          onChange={(e: any) => props.sampChange(e)}
          options={[
            {
              value: "Euler",
              label: "Euler",
              className: "font-eurostile text-[20px]",
            },
            {
              value: "Euler a",
              label: "Euler a",
              className: "font-eurostile text-[20px]",
            },
            {
              value: "LMS",
              label: "LMS",
              className: "font-eurostile text-[20px]",
            },
            // { value: 'Heun', label: 'Heun', className: 'font-eurostile text-[20px]' },
            // { value: 'DPM2', label: 'DPM2', className: 'font-eurostile text-[20px]' },
            // { value: 'DPM2 a', label: 'DPM2 a', className: 'font-eurostile text-[20px]' },
            {
              value: "DPM++ 2S a",
              label: "DPM++ 2S a",
              className: "font-eurostile text-[20px]",
            },
            {
              value: "DPM++ 2M",
              label: "DPM++ 2M",
              className: "font-eurostile text-[20px]",
            },
            {
              value: "DPM++ SDE",
              label: "DPM++ SDE",
              className: "font-eurostile text-[20px]",
            },
            {
              value: "DPM++ 2M SDE",
              label: "DPM++ 2M SDE",
              className: "font-eurostile text-[20px]",
            },
            {
              value: "DPM fast",
              label: "DPM fast",
              className: "font-eurostile text-[20px]",
            },
            // { value: 'DPM adaptive', label: 'DPM adaptive', className: 'font-eurostile text-[20px]' },
            // { value: 'DMP fast', label: 'DMP fast', className: 'font-eurostile text-[20px]' },
            // { value: 'DMP adaptive', label: 'DMP adaptive', className: 'font-eurostile text-[20px]' },
            // { value: 'LMS Karras', label: 'LMS Karras', className: 'font-eurostile text-[20px]' },
            // { value: 'DPM2 Karras', label: 'DPM2 Karras', className: 'font-eurostile text-[20px]' },
            // { value: 'DPM2 a Karras', label: 'DPM2 a Karras', className: 'font-eurostile text-[20px]' },
            // { value: 'DPM++ 2S a Karras', label: 'DPM++ 2S a Karras', className: 'font-eurostile text-[20px]' },
            {
              value: "DPM++ 2M Karras",
              label: "DPM++ 2M Karras",
              className: "font-eurostile text-[20px]",
            },
            {
              value: "DPM++ SDE Karras",
              label: "DPM++ SDE Karras",
              className: "font-eurostile text-[20px]",
            },
            {
              value: "DPM++ 2M SDE Karras",
              label: "DPM++ 2M SDE Karras",
              className: "font-eurostile text-[20px]",
            },
            {
              value: "DDIM",
              label: "DDIM",
              className: "font-eurostile text-[20px]",
            },
            {
              value: "PLMS",
              label: "PLMS",
              className: "font-eurostile text-[20px]",
            },
            {
              value: "UniPC",
              label: "UniPC",
              className: "font-eurostile text-[20px]",
            },
          ]}
        />
      </div>
    </>
  );
};
