// import React, { useEffect, useState } from 'react';
// import { List, Progress, message, Spin } from 'antd';
// import axios from 'axios';
// import './Sidebar.css';
// import getToken from '../Common/Auth';
// import { useNavigate } from 'react-router-dom';
// import {
//   CaretDownOutlined
// } from '@ant-design/icons';
// import { Col, Row } from 'antd';
// import completed from "../Sources/completedTick.png";
// import pending from "../Sources/pendingTick.png";




// const Sidebar = ({ chapters, progressPercentage, onChapterClick, id }) => {
//   const [subLists, setSubLists] = useState({});
//   const navigate = useNavigate();
//   const [selectedChapter,setSelectedChapter] = useState(null);
//   const [loading, setLoading] = useState(false);
//   const [chapterLength,setChapterLength] = useState(0);

//   useEffect(() => {
//     countResultLength();
//   },[chapters])

//   const countResultLength = () => {
//     setChapterLength(chapters.length);
//     console.log(chapters.length);
//   }

//   const handleItemClick = async (item) => {
//     if (subLists[item.id]) {
//       delete subLists[item.id];
//       setSelectedChapter(null);
//       setSubLists({ ...subLists });
//       return;
//     }

//     try {
//       setLoading(true);
//       const tokenResponse = getToken();
//       if (!tokenResponse || tokenResponse.status === 404) {
//         message.error("Some error occurred! Please log in again.");
//         navigate("/");
//         return;
//       }
//       setSelectedChapter(item.id);
//       const token = tokenResponse.token;
//       const options = {
//         params : {"chapter_id" : item.id},
//         headers: {
//             Authorization: token  
//         }
//     }
//       const url = `https://lms.soumit.in/api/v1/user_courses/${id}/topic_list`;
//       const response = await axios.get(url, options);
//       setSubLists({
//         ...subLists,
//         [item.id]: response.data
//       });
//     } catch (error) {
//       console.error("Failed to fetch sublist:", error);
//       message.error("An error occurred while fetching the sublist.");
//     } finally{
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="sidebar-container">
//       <div className='course-summary'>
//         <Row>
//           <Col span={20}>Chapters</Col>
//           <Col span={4}>{chapterLength}</Col>

//         </Row>
//       </div>
//       <div className="chapter-list">
//         <List
//           dataSource={chapters}
//           renderItem={(item) => (
//             <div key={item.id}>
//               <List.Item
//                 className={`chapter-item ${item.statusForUser}`}
//                 onClick={() => handleItemClick(item)}
//               >
//                 <img src={item?.statusForUser === "completed" ? completed : pending} alt='progress-icon' style={{height:'24px',width:'24px', marginRight: '4%'}} />
//                 {item.name}
//                   <CaretDownOutlined className='chapter-expand'/>
                
//               </List.Item>
//               <Spin spinning={loading}>

              
//               {subLists[item.id] && (
//                 <List
//                   dataSource={subLists[item.id]}
//                   className='topic-items'
//                   renderItem={(subItem) => (
//                     <List.Item
//                       className={`chapter-subitem ${subItem.statusForUser}`}
//                       onClick={() => onChapterClick(subItem.id, selectedChapter)}
                      
//                     >
//                       {subItem.name }
//                     </List.Item>
//                   )}
//                 />
//               )}
//               </Spin>
//             </div>
//           )}
//         />
//       </div>
//       <div className="progress-container">
//         <Progress percent={progressPercentage} strokeColor="#004747" />
//         <p>Your Progress</p>
//       </div>
//     </div>
//   );
// };

// export default Sidebar;

import React, { useEffect, useState } from 'react';
import { List, Progress, message, Spin } from 'antd';
import axios from 'axios';
import './Sidebar.css';
import getToken from '../Common/Auth';
import { useNavigate } from 'react-router-dom';
import { CaretDownOutlined } from '@ant-design/icons';
import { Col, Row } from 'antd';
import completed from "../Sources/completedTick.png";
import pending from "../Sources/pendingTick.png";

const Sidebar = ({ chapters, progressPercentage, onChapterClick, id }) => {
  const [subLists, setSubLists] = useState({});
  const navigate = useNavigate();
  const [selectedChapter, setSelectedChapter] = useState(null);
  const [loading, setLoading] = useState(false);
  const [chapterLength, setChapterLength] = useState(0);

  useEffect(() => {
    countResultLength();
  }, [chapters]);

  const countResultLength = () => {
    setChapterLength(chapters.length);
  };

  const handleItemClick = async (item) => {
    if (subLists[item.id]) {
      delete subLists[item.id];
      setSelectedChapter(null);
      setSubLists({ ...subLists });
      return;
    }

    try {
      setLoading(true);
      const tokenResponse = getToken();
      if (!tokenResponse || tokenResponse.status === 404) {
        message.error("Some error occurred! Please log in again.");
        navigate("/");
        return;
      }
      setSelectedChapter(item.id);
      const token = tokenResponse.token;
      const options = {
        params: { "chapter_id": item.id },
        headers: {
            Authorization: token  
        }
      };
      const url = `https://lms.soumit.in/api/v1/user_courses/${id}/topic_list`;
      const response = await axios.get(url, options);
      setSubLists({
        ...subLists,
        [item.id]: response.data
      });
    } catch (error) {
      console.error("Failed to fetch sublist:", error);
      message.error("An error occurred while fetching the sublist.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="sidebar-container">
      <div className='course-summary'>
        <Row>
          <Col span={20}>Chapters</Col>
          <Col span={4}>{chapterLength}</Col>
        </Row>
      </div>
      <div className="chapter-list">
        <List
          dataSource={chapters}
          renderItem={(item) => (
            <div key={item.id}>
              <List.Item
                className={`chapter-item ${item.statusForUser}`}
                onClick={() => handleItemClick(item)}
              >
                <img src={item?.statusForUser === "completed" ? completed : pending} alt='progress-icon' style={{ height: '24px', width: '24px', marginRight: '4%' }} />
                {item.name}
                <CaretDownOutlined className='chapter-expand' />
              </List.Item>
              <Spin spinning={loading}>
                {subLists[item.id] && (
                  <List
                    dataSource={subLists[item.id]}
                    className='topic-items'
                    renderItem={(subItem) => (
                      <List.Item
                        className={`chapter-subitem ${subItem.statusForUser}`}
                        onClick={() => onChapterClick(subItem.id, selectedChapter)}
                      >
                        {subItem.name}
                      </List.Item>
                    )}
                  />
                )}
              </Spin>
            </div>
          )}
        />
      </div>
      <div className="progress-container">
        <Row>
          <Col span={18}><p>Your Progress</p></Col>
          <Col span={6}><div className='percenatge-display'>{progressPercentage}%</div></Col>
        </Row>
        {/* <Progress percent={progressPercentage} strokeColor="#004747" /> */}
      </div>
    </div>
  );
};

export default Sidebar;
