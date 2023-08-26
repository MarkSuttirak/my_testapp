import { useFrappeGetDoc } from 'frappe-react-sdk';
import React, { useRef } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowBackIcon } from "@chakra-ui/icons"
import SidebarAdmin from '../../components/sidebar-admin';

export default function BlogView() {
  const { id } = useParams();
  const { data } = useFrappeGetDoc('Blogs', id, {
    fields: ['name', 'blogimage', 'title', 'content']
  })

  return (
    <>
      <SidebarAdmin />
      {data && (
        <div className='py-16 px-40 container-admin'>
          <div className="flex items-center gap-x-[8px] text-2xl">
            <Link to={`/blog-edit/${id}`} className="flex">
              <ArrowBackIcon />
            </Link>
            <h1 className='text-4xl font-bold'>You are viewing: {data.title}</h1>
          </div>

          <div className='mt-10'>
            <h1 className='text-3xl font-bold'>{data.title}</h1>
            <div id="preview" dangerouslySetInnerHTML={{ __html:data.content }} />
          </div>
        </div>
      )}
    </>
  );
}