import React from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../../components/Button/Button';
import Header from '../../components/Header/Header';
import '../../pages/WorkoutOverview/WorkoutOverview.scss';
import HomeIcon from '../../assets/Home-icon.svg';
import LogOverview from '../../components/LogOverview/LogOverview';


const WorkoutOverview = () => {
    const navigate = useNavigate();
  
    const handleHomeClick = () => {
      navigate('/home');
    };

    return (
        <div className="workout-page">  
          <div className="overview-section">
            <Header
              variant={'phoneS'}
              title='WORKOUT OVERVIEW'
            />

             <div className="log_overview">
            <LogOverview exercise={'Squat'} set={1} reps={10} weight={'60kg'} onEdit={function (): void {
                        throw new Error('Function not implemented.');
                    } }/>
            <LogOverview exercise={'Squat'} set={2} reps={10} weight={'65kg'} onEdit={function (): void {
                        throw new Error('Function not implemented.');
                    } }/>
            <LogOverview exercise={'Squat'} set={3} reps={8} weight={'70kg'} onEdit={function (): void {
                        throw new Error('Function not implemented.');
                    } }/>
            <LogOverview exercise={'Squat'} set={4} reps={8} weight={'70kg'} onEdit={function (): void {
                        throw new Error('Function not implemented.');
                    } }/>
            <LogOverview exercise={'Squat'} set={5} reps={6} weight={'75kg'} onEdit={function (): void {
                        throw new Error('Function not implemented.');
                    } }/>

            <div className="buttonworkout-group">
              <Button
                icon= {HomeIcon}
                label="HomePage"
                onClick={handleHomeClick}
                variant="orange"
              />
             
            </div>
          </div>
        </div>
        </div>
      );
    };
    
    export default WorkoutOverview;